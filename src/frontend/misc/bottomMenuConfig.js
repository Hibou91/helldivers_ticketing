

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
                name: '',
                icon: "library",
                isRouterLink: false,
                to: "/"
            },
            {
                name: '',
                icon: "library",
                isRouterLink: false,
                to: "/"
            },
           
        ]
    },
    library:{
        buttons:[
            {
                name: "QUESTCATEGORY",
                icon: "newquest",
                isRouterLink: false, 
            },
            {
                name: "LOCALE",
                icon: "library",
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