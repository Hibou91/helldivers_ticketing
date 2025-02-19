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

        <div class="castle-card">
            <tCard>
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

                <h3>The core</h3>
                <p>Compass in the labirinth of your castle and it's core of essence. Now empty, but it used to hold the
                    power of the castle. Got from... well maybe that was the reason
                    they inurned you.</p>
                <div class="col-mid-100">
                    <img src="../../../static/documentation/core.png" alt="" width="300">
                </div>

                <DocuIconHeader label="The Stock" icon="eye button long loot" />

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

                        With these you can empower your castle.
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
                        With these you can empower your servants and friends
                    </div>
                </div>
                
                <div class="flex-row" style="margin-top: 20px;">
                    <img src="../../../static/icons/materials/anima.png" alt="" width="50" height="50">
                    <p>Anima</p>
                </div>
                <p>And in the core there should be Anima. Souls of those sacrificed for your greater good.</p>
                <DocuIconHeader label="The Ritual Chamber" icon="eye button long castle" />


                <p>What is power for without using it to get... more power. With the proper sacrifices you can empower
                    your castle and make it srtong again.</p>

                <DocuIconHeader label="Garden" icon="eye button long garden" />

                <p>Your Garden, in it's demise still frourishing. Should be a place where you can live to your passions.
                </p>

                <DocuIconHeader label="Salon" icon="eye button long salon" />

                <p>Your Salon, this cosy place for the prescious time spent with the ones closest to you</p>

                <DocuIconHeader label="Library" icon="eye button long library" />

                <p>Your Library, where you can dedicate yourself to your work with your allies.</p>




                <h2 style="margin-top: 50px;">Garden, Salon, Library</h2>
                <p>You spent so many time in in these places, and you can make them your home again. </p>
                <p>Organise your things in your way with your categories.</p>
                <p>Spend time with an old friend.</p>
                <p>Work on your schemes to make this caste great again.</p>

                <div class="col-mid-100">
                    <img src="../../../static/documentation/locale.jpg" alt="" width="300">
                </div>

                <DocuIconHeader label="New Quest" icon="eye button long newquest" />
                <p>There are many things to do, but where to start your great plans. As great plans require... planning.
                </p>

                <div class="col-mid-100">
                    <img src="../../../static/documentation/newQuest.jpg" alt="" width="300">
                </div>

                <DocuIconHeader label="New Category" icon="eye button long necategory" />
                <p>Organizing things no matter how chaotic way is the method of the mastermind. If the masterminds would
                    like to do it of course.
                    You can add categories to use in Quests and even give colors to them.</p>
                <div class="col-mid-100">
                    <img src="../../../static/documentation/newCategories.jpg" alt="" width="300">
                </div>

                <DocuIconHeader label="Keeper" icon="eye button long keeper" />
                <p>You sense someone else in the castle. A presence of something old like yourself. Some of the shadows
                    start to move and take form.
                    Recognisable form of the lasts of the companions you had. They were starving for a long time,
                    weakened but still here.
                    Their cunning, strength and charisma is gone. If you just had the occult delicacies you could help
                    them. Withered as you are just look at each other. No words needed.</p>
                <p></p>




                <h3>Scavenges</h3>
                <p></p>

                <h2>Keepers</h2>

                <h2>Quests</h2>

                <h2>Scavenges</h2>



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