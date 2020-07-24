const NODE_DATA = [
  {
    title: 'parent 1',
    key: '0-0',
    isParent: true,
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        isParent: true,
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
            isParent: false
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
            isParent: false
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        isParent: true,
        children: [
          {
            title: 'leaf2',
            key: '0-0-1-0',
            isParent: false
          },
        ],
      },
    ],
  },
];

export default NODE_DATA;