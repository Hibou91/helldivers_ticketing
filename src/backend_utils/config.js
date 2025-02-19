export default {
  castle:{
    descriptions: [],
    levelMultiplier: 7,
    storageMultiplier: 2,
    animaLevelMultiplier: 100,
  },
  quests: {
    categories: {
      0: "Library",
      1: "Salon",
      2: "Garden",
    },
    progress: {
      0: "New",
      1: "In progress",
      2: "Pending",
      3: "Fed Up",
      5: "Temporarly Dead",
      4: "Finished",
    },
    priority: {
      0: "Who cares",
      1: "Should be done",
      2: "PANIC",
    },
  },
  locales: {
    locales: {
      library: {
        name: "Library",
        description: "A place for representation and carier.",
        category: 0,
        
      },
      salon: {
        name: "Salon",
        description: "A cosy room for family and private matters.",
        category: 1,
        
      },
      garden: {
        name: "Garden",
        description: "The flourishing world of creativity and hobbies",
        category: 2,
        
      },
    },
    keepers:{
      0:{
        name: "Luis",
        description:
          "Someone lurks in places noone should enter. The small. The cunning. The uninvitied guest.",
        dialogs: [
          "Of course, Master. Everything's in line.",
          "Truth is just the matter of perspective.",
          "Secret is what I know and you don't.",
          "I can find it out for you. No obligations.",
          "Knowing too much means that either you die, or others."
        ],
        homeLand: "Dungeon",
      },
      2: {
          name: "The Hound",
          description:
            "We give names to those lost to the intrigues of life. About him listening only to the call of nature enough if you know: he is The Hound.",
          dialogs: [
            "The hunt begins.",
            "As the wind calls... The Hound answers.",
            "I smell the blood to be spilled in the night.",
            "Noone escapes me.",
          ],
          homeLand: "Forest",
          
        },
        1:{
          name: "Madmoiselle Reatard",
          description:
            "Superiority lingers in her every movement, as she passes by barely noticing you. Calling you, the lesser... to obey.",
          dialogs: [
            "Good evening mor... Master",
            "I hope you don't come up anything silly this time",
            "You can serve me, of course",
            "Whatever, I don't think it's important.",
            "Did you bring something for me?",
            "Come before my throne.",
          ],
          homeLand: "Village",
          
        }
      }

    
  },
  scavenges: {
    types: [
      {
        place: "Dungeons",
        
      },
      {
        place: "Village",
       
      },
      {
        place: "Forest",
        
      },
      
      
    ],
    targets:[
      {
        name: "Kill",
        skills: ["Cunning", "Strength"]
      },
      {
        name: "Fetch",
        skills: ["Strength", "Charisma"]
      },
      {
        name: "Infiltrate",
        skills: ["Charisma", "Cunning"]
      }
    ],
    materials: {
      anima: {
        name: "Anima",
        occurrence: 1,
        countmin: 5,
        countmax: 10,
        category: ''
      },
      wood: {
        name: "Wood",
        occurrence: 0.5,
        countmin: 1,
        countmax: 5,
        category: 2,
      
      },
      silk: {
        name: "Silk",
        occurrence: 0.5,
        countmin: 1,
        countmax: 5,
        category: 1,
   
      },
      paper: {
        name: "Paper",
        occurrence: 0.5,
        countmin: 1,
        countmax: 5,
        category: 0,
   
      },
      magefish: {
        name: "Magefish",
        occurrence: 0.5,
        countmin: 1,
        countmax: 2,
        category: '',
      },
      witseed: {
        name: "Witseed",
        occurrence: 0.5,
        countmin: 1,
        countmax: 2,
        category: '',
      },
      lionheart: {
        name: "Lionheart",
        occurrence: 0.5,
        countmin: 1,
        countmax: 2,
        category: '',
      },

    }
  },
};
