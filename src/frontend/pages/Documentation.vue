<template>
    <div class="castle-bg">
        <tMenu menuName="Castle">

            <RouterLink to="/" class="fit-content">
                <tButton>Main Menu</tButton>
            </RouterLink>
            <RouterLink :to="$route.params.backto == 'mainMenu' ? '/' : `/${$route.params.backto}`" class="fit-content">
                <tButton>Return</tButton>
            </RouterLink>
        </tMenu>

        <div class="castle-card flex-row" style="justify-content: center;">
            <tCard style="max-width: 1000px;">
                <h2>Castle</h2>

                <p>Spirit, wake from your eternal slumber and enter the ruins of your once magnificent castle.</p>
                <p>Once this was a place of splendor full of life, now it lies in ruins. The emptyness yawns at you from
                    the corners and in the once fine halls only sparkles of dust dances to the sad tunes hummed by the
                    wind.
                    But now you are back to maybe start over. To rebuild what was lost centuries ago.
                </p>
                <p>And it's time to feed on the life of those who once fed on your death</p>

                <p>As you enter your castle you dig in your vague memories seemingly coming from an other world.
                    Certainly from an other life tough. There is... </p>

                <h3 style="margin-top: 50px;">The core</h3>
                <p>Compass in the labirinth of your castle and it's core of essence. Now empty, but it used to hold the
                    power of the castle. Got from... well maybe that was the reason
                    they inurned you.</p>
                <div class="col-mid-100">
                    <img src="../../../static/documentation/core.png" alt="" width="300">
                </div>

                <DocuIconHeader label="The Stock" icon="eye_button_long_loot" />

                <p>The shelves should hold the hoard finest wares from all of the world. Not spiders and dust.
                </p>
                <p>There should by piles of</p>

                <div class="flex-row">
                    <div class="flex-col col-mid">
                        <p>Fine Wares</p>
                        <div class="flex-row">
                            <img src="../../../static/icons/materials/paper.png" alt="" width="50" height="50">
                            <p>Paper</p>
                        </div>
                        <div class="flex-row">
                            <img src="../../../static/icons/materials/silk.png" alt="" width="50" height="50">
                            <p>Silk</p>
                        </div>
                        <div class="flex-row">
                            <img src="../../../static/icons/materials/wood.png" alt="" width="50" height="50">
                            <p>Wood</p>
                        </div>

                        <p>With these you can empower your castle.</p>
                    </div>

                    <div class="flex-col col-mid">
                        <p>Occult Delicacies</p>
                        <div class="flex-row">
                            <img src="../../../static/icons/foods/magefish.png" alt="" width="50" height="50">
                            <p>Magefish</p>
                        </div>
                        <div class="flex-row">
                            <img src="../../../static/icons/foods/witseed.png" alt="" width="50" height="50">
                            <p>Witseed</p>
                        </div>
                        <div class="flex-row">
                            <img src="../../../static/icons/foods/lionheart.png" alt="" width="50" height="50">
                            <p>Lionheart</p>
                        </div>
                        <p>With these you can empower your servants and friends</p>
                    </div>
                </div>

                <div class="flex-row" style="margin-top: 20px;">
                    <img src="../../../static/icons/materials/anima.png" alt="" width="50" height="50">
                    <p>Anima</p>
                </div>
                <p>And in the core there should be Anima. Souls of those sacrificed for your greater good.</p>
                <DocuIconHeader label="The Ritual Chamber" icon="eye_button_long_castle" />


                <p>What is power for without using it to get... more power. With the proper sacrifices you can empower
                    your castle and make it strong again.</p>

                <DocuIconHeader label="Garden" icon="eye_button_long_garden" />

                <p>Your Garden, in it's demise still flourishing. Should be a place where you can live to your passions.
                </p>

                <DocuIconHeader label="Salon" icon="eye_button_long_salon" />

                <p>Your Salon, this cosy place for the precious time spent with the ones closest to you</p>

                <DocuIconHeader label="Library" icon="eye_button_long_library" />

                <p>Your Library, where you can dedicate yourself to your work with your allies.</p>




                <h2 style="margin-top: 50px;">Haunts: Garden, Salon, Library</h2>
                <p>You spent so many time in in these places, and you can make them your home again. </p>
                <p>Organise your things in your way with your categories.</p>
                <p>Spend time with an old friend.</p>
                <p>Work on your schemes to restore the glory of yourself and your castle.</p>

                <div class="col-mid-100">
                    <img src="../../../static/documentation/locale.jpg" alt="" width="300">
                </div>

                <DocuIconHeader label="New Scheme" icon="eye_button_long_newquest" />
                <p>There are many things to do, but where to start your great plans. As great plans require... planning.
                </p>

                <div class="col-mid-100">
                    <img src="../../../static/documentation/newQuest.jpg" alt="" width="300">
                </div>

                <p>The important things you can put to the shelves while hide the details. You can see the name, the
                    priority you can mark with a seal.
                    You can see how the quest is going, if it is waiting for someone, or if it has subquests how much is
                    done </p>


                <div class="col-mid-100">
                    <img src="../../../static/documentation/quests.jpg" alt="" width="300">
                </div>

                <tButton>Notifications</tButton>

                <p>You send spirits to the future, to tell you about things that should be done precise timing</p>



                <div class="col-mid-100">
                    <img src="../../../static/documentation/notifications.jpg" alt="" width="300">
                </div>

                <tButton>Subquests</tButton>
                <p>One step at a time. You can divide the quest into smaller parts.</p>
                <div class="col-mid-100">
                    <img src="../../../static/documentation/subQuests.jpg" alt="" width="300">
                </div>

                <DocuIconHeader label="New Category" icon="eye_button_long_necategory" />
                <p>Organizing things no matter how chaotic way is the method of the mastermind. If the mastermind would
                    like to do it of course.
                    You can add categories to use in Quests and even give colors to them.</p>
                <div class="col-mid-100">
                    <img src="../../../static/documentation/newCategories.jpg" alt="" width="300">
                </div>

                <DocuIconHeader label="Keeper" icon="eye_button_long_keeper" />
                <p>You sense someone else in the castle. A presence of something old and... sad like yourself. Some of
                    the shadows
                    start to move and take form.
                    Recognisable form of the lasts of the companions you had. They were starving for a long time,
                    weakened but still here.
                    Their cunning, strength and charisma is gone. If you just had the occult delicacies you could help
                    them. Withered as you are just look at each other. No words needed.</p>
                <p>Ripped of their titles they are, but they will get them back as they will get stronger. And stronger
                    they will get now.</p>

                <div class="col-mid-100">
                    <img src="../../../static/documentation/keeper.png" alt="" width="300">
                </div>



                <DocuIconHeader label="Scavenge" icon="eye_button_long_scavenge" />
                <p>While you are occupied with your schemes your allies can do their own part. They know the nearby
                    dungeons forest and village well,
                    from where they can gather the resources so desparately needed to rebuild yourselves and your
                    castle. They spy, kill, and pick up what they can.
                    Look at their plans and help them choose the right ones.
                </p>
                <div class="col-mid-100">
                    <img src="../../../static/documentation/scavenges.jpg" alt="" width="300">
                </div>

                <p>They are better in their homelands but can stand their ground anywhere. As they get back their
                    strength choose scavenges that will suit their skills.
                    
                </p>

                <div class="col-mid-100">
                    <img src="../../../static/documentation/scavengemain.jpg" alt="" width="300">
                </div>



            </tCard>
        </div>


    </div>

</template>

<script setup>

import tButton from '../components/tButton.vue';
import tMenu from '../components/tMenu.vue';
import tCard from '../components/tCard.vue';
import DocuIconHeader from '../components/DocuIconHeader.vue';



</script>

<style scoped>
.castle-bg {
    width: 100vw;
    height: 100vh;
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
    top: 0;
    right: 0;
    background-image: url("./static/castle/castle.jpg");
    z-index: -10;
}

.castle-card {
    margin: 40px 40px 40px 40px;
    width: calc(100% - 80px);
    max-width: calc(100% - 80px);
    height: calc(100% - 80px - 70px);
    max-height: calc(100% - 80px);
}

.col-mid {
    width: 50%;
    text-align: center;
    align-items: center;
}

.col-mid-100 {
    width: 100%;
    text-align: center;
    align-items: center;
}

.col-menu-left {
    width: 100px;
}

.col-menu-right {
    width: calc(100% - 100px);
}

.title {
    padding: 20px
}

.main-menu-button {
    display: flex;
    flex-direction: row;
}

.main-menu-title {
    margin-top: auto;
    margin-bottom: auto;
}
</style>