let db ={
    users: [
        {
            userId: 'Cbmj0x7WHuEtc6bquuoZ',
            email: 'user@email.com',
            handle: 'userNickName',
            createdAt: '2021-10-27T19:53:48.206Z',
            isAdmin: 'true',
            maybe: 'SIN, address, their info of income, etc.'
        }
    ],

    projects: [
        {
            address: "The address of the house where work is performed at",
            createdAt: '2021-10-27T19:53:48.206Z',
            bossCompany: 'The name of the company who hired me for work',
            userHandle: 'Who added this project to db',
            makeMoney: "How much money is payment for this job",
            spendMoney: 'Expences for this job',
            isStarted: 'Is this job started',
            isFinished: 'Is this job finished',
            isFullyPaid: 'Is this fully paid by bossCompany',
            room: 'Main Bathroom',
            size: '1500'
        }
    ],

    materials: [
        {
            //calculate the wholeroom in inches and then calculate to sqft
            //formula is length/12 * width/12 = sqft;
            materialType: "Tile/PlasticClips/Stone/Dry",
            materialExactName: "Achim Home Furnishings Nexus",
            uniqueCode: "FTVSO10320",
            manufacturer: "Achim Imports",
            quantityInBox: "20",
            length: "11,8", //inches
            width: "11,8", //inches
            height: "3.3", //centimeters
            createdAt: "2021-10-27T19:53:48.206Z",
            userHandle: "Sam",
            sqftPerTile: '0.97', //sqft
            sqftPerBox: '19.33', //sqft
            price: '30', //Canadian dollars per box before tax
            quantity: '50' //Boxes is currently in warehouse


        }
    ]
};

const userDetails = {
    //Redux data
    credentials: {
        userId: 'N43KJ5H43KJHREW4J5H3JWMERHB',
        email: 'user@email.com',
        handle: 'user',
        createdAt: '2019-03-15T10:59:52.798Z'
      }
}