import * as jQuery from 'jquery'
import dagre from 'dagre'
import graphlib from 'graphlib'
import * as joint from 'jointjs'
import {Category} from '@app/_models'

export class ConceptMapGraph {
    graph
    paper
    offsetX = 20
    offsetY = 20

    constructor(onclick: (number) => unknown) {
        this.graph = new joint.dia.Graph()

        this.paper = new joint.dia.Paper({
            el: jQuery('#paper'),
            width: '100%',
            height: 'calc(100vh - 19rem)',
            model: this.graph,
            gridSize: 20,
            interactive: false
        })
        this.paper.translate(this.offsetX, this.offsetY)

        this.paper.on('cell:pointerdown', (cellView) => {
            if (cellView.model.attributes.type === 'standard.Ellipse') {
                onclick(cellView.model.id)
            }
        })
    }

    makeElement(id: number, label: string): joint.shapes.standard.Ellipse {
        const maxLineLength = Math.max(...label.split('\n').map(x => x.length))

        const letterSize = 16
        const width = 1.3 * (letterSize * (0.6 * maxLineLength + 1))
        const height = 1.5 * ((label.split('\n').length + 1) * letterSize)

        return new joint.shapes.standard.Ellipse({
            id,
            size: {width, height},
            fill: 'var(--tui-secondary)',
            attrs: {
                label: {
                    text: label,
                    'font-size': letterSize,
                    'font-weight': 'bold',
                    'font-family': 'sans-serif',
                    fill: 'var(--tui-text-01)',
                    cursor: 'pointer',
                },
                body: {
                    width, height,
                    rx: 10, ry: 10,
                    stroke: 'var(--tui-base-08)',
                    cursor: 'pointer',
                    fill: 'var(--tui-secondary)',
                },
            }
        })
    }

    makeLink(parentElementLabel: number, childElementLabel: number): joint.shapes.standard.Link {
        return new joint.shapes.standard.Link({
            source: {
                id: parentElementLabel,
            },
            target: {
                id: childElementLabel,
            },
            router: {
                name: 'manhattan',
                args: {
                    maxAllowedDirectionChange: 360,
                    perpendicular: false,
                    startDirections: ['right', 'top', 'bottom'],
                    endDirections: ['left', 'top', 'bottom']
                }
            },
            connector: {
                name: 'rounded',
            },
            attrs: {
                line: {
                    stroke: 'var(--tui-base-08)',
                    cursor: 'default',
                },
                wrapper: {
                    cursor: 'default'
                }
            },
        })
    }

    makeCellsFromAdjacencyList(adjacencyList: Category[]): joint.shapes.standard.Ellipse[] {

        const elements = []
        const links = []

        adjacencyList.forEach(category => {
            const label = `${category.name.replaceAll(' ', '\n')}\n\n${Math.round(category.average_success * 100)}% (${category.question_count} Total)`
            elements.push(this.makeElement(category.pk, label))

            category.next_category_ids.forEach(childElementId => {
                links.push(this.makeLink(category.pk, childElementId))
            })
        })

        return elements.concat(links)
    }

    buildGraphFromAdjacencyList(adj: Category[]): void {
        const cells = this.makeCellsFromAdjacencyList(adj)
        this.graph.resetCells(cells)
        const directedGraph = joint.layout.DirectedGraph.layout(this.graph, {
            dagre,
            graphlib,
            nodeSep: 40,
            edgeSep: 40,
            ranker: 'longest-path',
            rankDir: 'LR',
        })
        this.paper.svg.style.width = `${directedGraph.width + this.offsetX * 2}px`
        this.paper.svg.style.height = `${directedGraph.height + this.offsetY * 2}px`
    }
}
