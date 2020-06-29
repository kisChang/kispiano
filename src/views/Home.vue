<template>
    <v-app>
        <v-app-bar app color="indigo" dark dense >
            <v-toolbar-title>Title</v-toolbar-title>
        </v-app-bar>

        <v-btn class="mx-2" fab small fixed style="z-index: 99;bottom: 14px;left: 50%;transform: translate(-60%, 0);">
            <v-icon dark>mdi-plus</v-icon>
        </v-btn>
        <v-bottom-navigation fixed height="40">
            <v-btn @click="sheetLeftViews = !sheetLeftViews" style="position: absolute;left:0;" value="recent">
                <v-icon>mdi-format-list-bulleted-square</v-icon>
            </v-btn>
            <v-btn @click="sheetRightUser = !sheetRightUser" style="position: absolute;right:0;" value="nearby">
                <v-icon>mdi-cog-outline</v-icon>
            </v-btn>
        </v-bottom-navigation>

        <v-bottom-sheet v-model="sheetLeftViews">
            <v-sheet class="text-center" height="200px">
                <div class="py-3">This is a bottom sheet using the controlled by v-model instead of activator</div>
            </v-sheet>
        </v-bottom-sheet>
        <v-bottom-sheet v-model="sheetRightUser">
            <v-sheet class="text-center" height="200px">
                <div class="py-3">This is a bottom User UserUserUserUser</div>
            </v-sheet>
        </v-bottom-sheet>


        <v-main class="overflow-y-auto">
            <v-container class="fill-height" fluid>
                <div class="home">
                    <img alt="Vue logo" src="../assets/logo.png">
                    <HelloWorld/>
                </div>
                <div class="home">
                    <img alt="Vue logo" src="../assets/logo.png">
                    <HelloWorld/>
                </div>
                <div class="home">
                    <img alt="Vue logo" src="../assets/logo.png">
                    <HelloWorld/>
                </div>
                <div class="home">
                    <img alt="Vue logo" src="../assets/logo.png">
                    <HelloWorld/>
                </div>
                <div class="home">
                    <img alt="Vue logo" src="../assets/logo.png">
                    <HelloWorld/>
                </div>
                <div class="home">
                    <img alt="Vue logo" src="../assets/logo.png">
                    <HelloWorld/>
                </div>
                <div class="home">
                    <img alt="Vue logo" src="../assets/logo.png">
                    <HelloWorld/>
                </div>
            </v-container>
        </v-main>
    </v-app>

    <!--
        <v-navigation-drawer v-model="drawer" app>
            <v-list dense>
                <v-list-item link replace to="/">
                    <v-list-item-action><v-icon>mdi-home</v-icon></v-list-item-action>
                    <v-list-item-content>Home</v-list-item-content>
                </v-list-item>
                <v-list-item link replace to="/about">
                    <v-list-item-action><v-icon>mdi-email</v-icon></v-list-item-action>
                    <v-list-item-content>About</v-list-item-content>
                </v-list-item>
                <v-list-item link replace to="/test/piano">
                    <v-list-item-action><v-icon>mdi-email</v-icon></v-list-item-action>
                    <v-list-item-content>Piano</v-list-item-content>
                </v-list-item>
                <v-list-item link replace to="/test/midi">
                    <v-list-item-action><v-icon>mdi-email</v-icon></v-list-item-action>
                    <v-list-item-content>Midi</v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
-->
</template>

<script>
    import HelloWorld from '@/components/HelloWorld.vue'

    //应用首页
    export default {
        name: 'Home',
        components: {
            HelloWorld
        },
        data: () => ({
            sheetLeftViews: false,
            sheetRightUser: false,
            drawer: null,
        }),
        mounted() {
            console.log("OK")
            window['te'] = this;
        }
    }
</script>
