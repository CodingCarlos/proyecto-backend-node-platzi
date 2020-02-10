const nanoid = require('nanoid');
const auth = require('../auth');

const TABLA = 'user';

module.exports = function (injectedStore, injectedCache) {
    let store = injectedStore;
    let cache = injectedCache;
    if (!store) {
        store = require('../../../store/dummy');
    }
    if (!cache) {
        cache = require('../../../store/dummy');
    }

    async function list() {
        let users = await cache.list(TABLA);

        if (!users) {
            console.log('No estaba en caché. Buscado en DB')
            users = await store.list(TABLA);
            cache.upsert(TABLA, users);
        } else {
            console.log('Nos traemos datos de cache');
        }
        
        return users;
    }

    function get(id) {
        return store.get(TABLA, id);
    }

    async function upsert(body) {
        const user = {
            name: body.name,
            username: body.username,
        }

        if (body.id) {
            user.id = body.id;
        } else {
            user.id = nanoid();
        }


        return await auth.upsert({
                id: user.id,
                username: user.username,
                password: body.password,
            })


    }

    function follow(from, to) {
        return store.upsert(TABLA + '_follow', {
            user_from: from,
            user_to: to,
        });
    }

    async function following(user) {
        const join = {}
        join[TABLA] = 'user_to'; // { user: 'user_to' }
        const query = { user_from: user };
		return await store.query(TABLA + '_follow', query, join);
	}

    return {
        list,
        get,
        upsert,
        follow,
        following,
    };
}