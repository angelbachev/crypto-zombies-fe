const artifact = [
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_genes",
                "type": "uint256"
            }
        ],
        "name": "createKitty",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256[]",
                "name": "_ids",
                "type": "uint256[]"
            },
            {
                "internalType": "uint256[]",
                "name": "_genes",
                "type": "uint256[]"
            }
        ],
        "name": "createManyKitties",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "genesOfKitties",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getKittiesIds",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            }
        ],
        "name": "getKitty",
        "outputs": [
            {
                "internalType": "bool",
                "name": "isGestating",
                "type": "bool"
            },
            {
                "internalType": "bool",
                "name": "isReady",
                "type": "bool"
            },
            {
                "internalType": "uint256",
                "name": "cooldownIndex",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "nextActionAt",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "siringWithId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "birthTime",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "matronId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "sireId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "generation",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "genes",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "kittiesIds",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
] as const; 

export default artifact;