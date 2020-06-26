<template>
    <v-app id="inspire">
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

        <v-app-bar app color="indigo" dark>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Kis Piano</v-toolbar-title>
        </v-app-bar>

        <v-main>
            <router-view/>
        </v-main>
    </v-app>
</template>

<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        name: 'App',
        data: () => ({
            drawer: null,
        }),
        mounted(): void {
            console.log("OK")
        }
    });
</script>
