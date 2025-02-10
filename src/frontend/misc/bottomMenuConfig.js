

export default {
    castle:{
        buttons:[
            {
                name: "LIBRARY",
                icon: "library",
                isRouterLink: true,
                to: "/library"
            },
            {
                name: "SALON", 
                icon: "salon",
                isRouterLink: true,
                to: "/salon"
            },
            {
                name: "GARDEN",
                icon: "garden",
                isRouterLink: true,
                to: "/garden"
            },
            {
                name: 'CASTLE',
                icon: "castle",
                isRouterLink: false,
                to: "/"
            },
           
        ]
    },
    library:{
        buttons:[
            {
                name: "QUESTCATEGORY",
                icon: "necategory",
                isRouterLink: false, 
            },
            {
                name: "KEEPER",
                icon: "keeper",
                isRouterLink: false, 
            },
            
            {
                name: "NEWQUEST",
                icon: "newquest",
                isRouterLink: false, 
            },
           
        ]
    }
}