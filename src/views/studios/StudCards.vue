<template>
<v-container class="my-12">
    <v-col class="justify-center"> 
        <h1>スタジオ紹介</h1>
    <div class="card-list pa-7 d-flex flex-wrap flex-row px-0">
        <stud-card 
        v-for="studiosCard in studiosCards" 
        v-bind:key="studiosCard.id"
        :photoURL = studiosCard.photoURL 
        :recommend = studiosCard.recommend 
        :cardTitle=studiosCard.cardTitle 
        :location=studiosCard.location 
        class="mb-6"
        >
        </stud-card>
        </div>
    </v-col>
</v-container>
</template>

<script>
import StudCard from '@/components/StudCard.vue'

export default {
    name:'stud-cards',
    components:{
        'stud-card': StudCard,
    },
    data(){
        return{
            childTitle: 'スタジオ比較',
            studiosCards:[
                {
                    photoURL: 'https://images.unsplash.com/photo-1553531580-a000ac8df244?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=564&q=80',
                    cardTitle:'Good Morning Gym',
                    location: 'Hokkaido',
                    recommend: 'Super good studios!!'
                },
                {
                    photoURL: 'https://images.unsplash.com/photo-1553531889-65d9c41c2609?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
                    cardTitle:'Good Afternoon Gym',
                    location: 'Sendai',
                    recommend: 'Super good studios!!'
                },
                {
                    photoURL:'https://images.unsplash.com/photo-1518609571773-39b7d303a87b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
                    cardTitle:'Good Evening Gym',
                    location: 'Kyoto',
                    recommend: 'Super good studios!!'
                },
                {
                    photoURL:'https://images.unsplash.com/photo-1549540951-dc3f59581f6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
                    cardTitle:'Hello World Gym',
                    location: 'Yokohama',
                    recommend: 'Super good studios!!'
                },
            ]
        }
    }
}
</script>

<style>

</style>