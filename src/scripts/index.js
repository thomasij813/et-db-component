import Airtable from 'airtable'
import { select } from 'd3-selection'

import secret from '../secret/secret.js'

import drawChart from './chart'

import '../style/style.css'

const base = new Airtable({apiKey: secret.AIRTABLE_API_KEY}).base('appaGqgruvly46zxj');

base('Training').select({
    view: 'E&T Dashboard'
})

const asyncFunction = async () => {
    let trainingData = []

    await base('Training').select({
        view: 'E&T Dashboard',
        sort: [{field: 'Start_Date', direction: 'asc'}]
    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(record => {
            const d = {
                name: record.fields.Name,
                attendee_goal: record.fields.Attendee_Goal,
                registrants: record.fields.Total_Attendees,
                type: record.fields.Type,
                status: record.fields.Status
            }
            trainingData.push(d)
        })
        fetchNextPage()
    })

    drawChart(trainingData, select('svg'))
}

asyncFunction()