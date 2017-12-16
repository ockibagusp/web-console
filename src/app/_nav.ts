export const ROLEACCESS = {
    'auth': '*',
    'admin': 1,
    'researcher': 0
};

export const navigation = [
    {
        name: 'Super-Nodes',
        url: '/supernodes',
        icon: 'fa fa-microchip',
        role: ROLEACCESS.auth,
        children: [
            {
                name: 'List',
                url: '/supernodes/list',
                icon: 'fa fa-list'
            },
            {
                name: 'Add',
                url: '/supernodes/new',
                icon: 'fa fa-plus-square'
            }
        ]
    },
    {
        name: 'Nodes',
        url: '/nodes',
        icon: 'fa fa-microchip',
        role: ROLEACCESS.auth,
        children: [
            {
                name: 'List',
                url: '/nodes/list',
                icon: 'fa fa-list'
            },
            {
                name: 'Add',
                url: '/nodes/new',
                icon: 'fa fa-plus-square'
            }
        ]
    },
    {
        name: 'Users',
        url: '/users',
        icon: 'fa fa-user',
        role: ROLEACCESS.admin,
        children: [
            {
                name: 'List',
                url: '/users/list',
                icon: 'fa fa-list'
            },
            {
                name: 'Add',
                url: '/users/new',
                icon: 'fa fa-user-plus'
            }
        ]
    }
];
