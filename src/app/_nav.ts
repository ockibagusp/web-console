export const navigation = [
    {
        name: 'Dashboard',
        url: '/dashboard',
        icon: 'icon-speedometer'
    },
    {
        name: 'Nodes',
        url: '/nodes',
        icon: 'fa fa-microchip',
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
