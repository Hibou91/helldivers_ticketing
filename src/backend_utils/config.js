export default {
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
        questCategories: [
          {
            id: 0,
            label: 'Graphics',
            color: '#00ff55'
          },
          {
            id: 1,
            label: 'Development',
            color: '#ff0000'
          },
        ]
      },
      salon: {
        name: "Salon",
        description: "A cosy room for family and private matters.",
        category: 1,
        questCategories: [
          {
            id: 0,
            label: 'Family',
            color: '#00ff55'
          },
          {
            id: 1,
            label: 'Bikers',
            color: '#00ff55'
          },
          {
            id: 2,
            label: 'Hikers',
            color: '#00ff55'
          },
         
        ]
      },
      garden: {
        name: "Garden",
        description: "The flourishing world of creativity and hobbies",
        category: 2,
        questCategories: [
          {
            id: 0,
            label: 'Art',
            color: '#00ff55'
          },
          {
            id: 1,
            label: 'Development',
            color: '#00ff55'
          },
          {
            id: 2,
            label: 'Geeking',
            color: '#00ff55'
          },
        ]
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
        ],
        skills: {
          cunning: 0, 
          charisma: 0,
          strength: 0,
        }
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
          skills: {
            cunning: 0, 
            charisma: 0,
            strength: 0,
          }
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
          ],
          skills: {
            cunning: 0, 
            charisma: 0,
            strength: 0,
          }
        }
      }

    
  },
  scavenges: {
    types: [
      {
        place: "Dungeons",
        materials: {
          paper: {
            name: "Paper",
            occurrence: "0.1",
          },
        },
      },
      {
        place: "Village",
        materials: {
          silk: {
            name: "Silk",
            occurrence: "0.1",
          },
        },
      },
      {
        place: "Forest",
        materials: {
          paper: {
            wood: "Wood",
            occurrence: "0.1",
          },
        },
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
        occurrence: 0.8,
        countmin: 5,
        countmax: 10,
        keeperbonus: 0,
      },
      experience: {
        occurrence: 1,
        countmin: 5,
        countmax: 10,
        keeperbonus: 0,
      }
    }
  },
};
