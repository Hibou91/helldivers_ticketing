export default {
  quests:{
    categories: {
      0: "Library",
      1: "Salon",
      2: "Garden"
    },
    progress: {
      0: "New",
      1: "In progress",
      2: "Pending",
      3: "Fed Up",
      4: "Finished"
    },
    priority: {
      0: "Who cares",
      1: "Should be done",
      2: "PANIC",
    },
  },
  locales:{
    locales:{
      library:{
        name: "Library",
        description: "A place for representation and carier.",
        category: 0,
        keeper: {
          name: 'Luis',
          description: "Someone lurks in places noone should enter. The small. The cunning. The uninvitied guest.",
          dialogs:[
            "Of course, Master. Everything's in line.",
            "I heard some gossip you might be interested in.",
            "Secret is what I know and you don't.",
            "I can find it out for you. No obligations."
          ],
        },
        
        scavenge:{
          place: "Dungeons",
          materials: {
            paper:{
              name: "Paper",
              occurrence: "0.1"
            }
          }
        }
      },
      salon:{
        name: "Salon",
        description: "A cosy room for family and private matters.",
        category: 1,
        keeper: {
          name: 'Madmoiselle Reatard',
          description: 'Superiority lingers in her every movement, as she passes by barely noticing you. Calling you, the lesser... to obey.',
          dialogs:[
            "Good evening mor... Master",
            "I hope you don't come up anything silly this time",
            "You can serve me, of course",
            "Whatever, I don't think it's important."
          ],
        },
        
        scavenge:{
          place: "Village",
          materials: {
            silk:{
              name: "Silk",
              occurrence: "0.1"
            }
          }
        }
      },
      garden:{
        name:"Garden",
        description: "The flourishing world of creativity and hobbies",
        category:2,
        keeper: {
          name: 'The Hound',
          description: 'We give names to those lost to the intrigues of life. About him listening only to the call of nature enough if you know: he is The Hound.',
          dialogs:[
            "The hunt begins.",
            "As the wind calls... The Hound answers.",
            "I smell the blood to be spilled in the night.",
            "Noone escapes me."
          ],
        },
        scavenge:{
          place: "Forest",
          materials: {
            paper:{
              wood: "Wood",
              occurrence: "0.1"
            }
          }
        }
      },
      
  }
  }
};
