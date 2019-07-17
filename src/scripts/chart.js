import {scaleLinear, scaleBand} from 'd3-scale'
import { axisBottom } from 'd3-axis'
import { format } from 'd3-format'

export default function(data, svg) {
    const margin = {
        top: 10,
        bottom: 50,
        left: 10,
        right: 10
    }

    const height = svg.attr('height') - margin.top - margin.bottom
    const width = svg.attr('width') - margin.left - margin.right

    const g = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`)

    const horScale = scaleLinear()
        .domain([0, 1])
        .range([0, width])

    const vertScale = scaleBand()
        .domain(data.map(d => d.name))
        .range([0, height])
        .padding(.5)

    const trainingTitles = g.selectAll('text.training-name')
        .data(data)
        .enter()
        .append('text')
        .classed('training-title', true)
        .text(d => d.name)
        .attr('y', d => vertScale(d.name) - 5)

    const bar = g.selectAll('rect.bar')
        .data(data)
        .enter()
        .append('rect')
        .classed('bar', true)
        .attr('x', 0)
        .attr('y', d => vertScale(d.name))
        .attr('height', vertScale.bandwidth())
        .attr('width', d => {
            const goalPercent = d.registrants / d.attendee_goal
            return goalPercent <= 1 ? horScale(d.registrants / d.attendee_goal) : horScale(1)
        })

    const registrantsText = g.selectAll('text.registrants')
        .data(data)
        .enter()
        .append('text')
        .classed('registrants', true)
        .text(d => `${d.registrants} / ${d.attendee_goal}`)
        .attr('y', d => vertScale(d.name))
        .attr('x', 0)
        .attr('transform', d => {
            const goalPercent = d.registrants / d.attendee_goal
            const scaleShift = goalPercent <= 1 ? horScale(d.registrants / d.attendee_goal) : horScale(1)
            const horTrans = goalPercent > .1 ? scaleShift - 10 : scaleShift + 5
            return `translate(${horTrans}, ${vertScale.bandwidth() / 2})`
        })
        .attr('text-anchor', d => d.registrants / d.attendee_goal > .1 ? 'end' : 'start')
        .attr('fill', d => d.registrants / d.attendee_goal > .1 ? 'white' : 'black')
        .attr('alignment-baseline', 'middle')
        .attr('font-size', 14)

    const horAxis = axisBottom()
        .scale(horScale)
        .tickFormat(format(".0%"))

    const axis  = svg.append('g')
        .call(horAxis)
        .attr('transform', `translate(${margin.left}, ${height + margin.top})`)
    
    svg.append('text')
        .text('Percent Towards Registration Goal')
        .attr('transform', `translate(${margin.left}, ${height + margin.top + 30})`)
        .attr('alignment-baseline', 'middle')
        .attr('font-size', 14)
}