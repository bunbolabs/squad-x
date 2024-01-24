export type SquadX = {
  version: '0.1.0'
  name: 'squad_x'
  instructions: [
    {
      name: 'createUserAccount'
      accounts: [
        {
          name: 'user'
          isMut: true
          isSigner: false
        },
        {
          name: 'signer'
          isMut: true
          isSigner: true
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: 'displayName'
          type: 'string'
        },
        {
          name: 'badge'
          type: 'string'
        }
      ]
    },
    {
      name: 'joinSquad'
      accounts: [
        {
          name: 'user'
          isMut: true
          isSigner: false
        },
        {
          name: 'squad'
          isMut: true
          isSigner: false
        },
        {
          name: 'signer'
          isMut: true
          isSigner: true
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        }
      ]
      args: []
    },
    {
      name: 'createSquad'
      accounts: [
        {
          name: 'squad'
          isMut: true
          isSigner: false
        },
        {
          name: 'user'
          isMut: true
          isSigner: false
        },
        {
          name: 'signer'
          isMut: true
          isSigner: true
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: 'displayName'
          type: 'string'
        },
        {
          name: 'motto'
          type: 'string'
        },
        {
          name: 'badge'
          type: 'string'
        }
      ]
    }
  ]
  accounts: [
    {
      name: 'users'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'displayName'
            type: 'string'
          },
          {
            name: 'level'
            type: 'u8'
          },
          {
            name: 'badge'
            type: 'string'
          },
          {
            name: 'squad'
            type: 'publicKey'
          }
        ]
      }
    },
    {
      name: 'squads'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'displayName'
            type: 'string'
          },
          {
            name: 'motto'
            type: 'string'
          },
          {
            name: 'level'
            type: 'u8'
          },
          {
            name: 'members'
            type: 'u8'
          },
          {
            name: 'badge'
            type: 'string'
          },
          {
            name: 'owner'
            type: 'publicKey'
          }
        ]
      }
    }
  ]
  errors: [
    {
      code: 6000
      name: 'AlreadyJoinedSquad'
      msg: 'Already joined squad!'
    }
  ]
}

export const IDL: SquadX = {
  version: '0.1.0',
  name: 'squad_x',
  instructions: [
    {
      name: 'createUserAccount',
      accounts: [
        {
          name: 'user',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'signer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'displayName',
          type: 'string',
        },
        {
          name: 'badge',
          type: 'string',
        },
      ],
    },
    {
      name: 'joinSquad',
      accounts: [
        {
          name: 'user',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'squad',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'signer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'createSquad',
      accounts: [
        {
          name: 'squad',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'user',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'signer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'displayName',
          type: 'string',
        },
        {
          name: 'motto',
          type: 'string',
        },
        {
          name: 'badge',
          type: 'string',
        },
      ],
    },
  ],
  accounts: [
    {
      name: 'users',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'displayName',
            type: 'string',
          },
          {
            name: 'level',
            type: 'u8',
          },
          {
            name: 'badge',
            type: 'string',
          },
          {
            name: 'squad',
            type: 'publicKey',
          },
        ],
      },
    },
    {
      name: 'squads',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'displayName',
            type: 'string',
          },
          {
            name: 'motto',
            type: 'string',
          },
          {
            name: 'level',
            type: 'u8',
          },
          {
            name: 'members',
            type: 'u8',
          },
          {
            name: 'badge',
            type: 'string',
          },
          {
            name: 'owner',
            type: 'publicKey',
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: 'AlreadyJoinedSquad',
      msg: 'Already joined squad!',
    },
  ],
}
