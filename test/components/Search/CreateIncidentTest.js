'use strict'
import { expect } from 'chai'
import { CreateIncident, mapStateToProps } from '../../../src/components/Search/CreateIncident'
import FlatButtonStyled from '../../../src/components/elements/FlatButtonStyled'
import React from 'react'
import TestUtils from 'react-dom/test-utils'
import createComponent from '../../helpers/shallowRenderHelper'
import { TextField } from 'material-ui'

function mockDispatch (object) { }

function setup (input, creationError) {
    let props = {
        dispatch: mockDispatch,
        input,
        creationError
    }
    let renderer = TestUtils.createRenderer()
    renderer.render(<CreateIncident {...props}/>)
    let output = renderer.getRenderOutput()

    return {
        props,
        output,
        renderer
    }
}

describe('CreateIncident', function testCreateIncident () {
    beforeEach(function createIncidentInit () {
        this.testError = 'Test Error'
        this.testInput = '10'

        this.defaultCase = setup('','').output
        this.withError = setup('',this.testError).output
        this.withInput = setup(this.testInput, '').output
    })

    it('Should render a div with text field and FlatButtonStyled', function createIncidentRenderDiv () {
        expect(this.defaultCase.type).to.equal('div')
        expect(this.defaultCase.props.children[0].type).to.equal(TextField)
        expect(this.defaultCase.props.children[1].type).to.equal(FlatButtonStyled)
        expect(this.withError.type).to.equal('div')
        expect(this.withError.props.children[0].type).to.equal(TextField)
        expect(this.withError.props.children[1].type).to.equal(FlatButtonStyled)
        expect(this.withInput.type).to.equal('div')
        expect(this.withInput.props.children[0].type).to.equal(TextField)
        expect(this.withInput.props.children[1].type).to.equal(FlatButtonStyled)
    })

    it('Should pass props.input to TextField value', function createIncidentDisplayInput () {
        expect(this.defaultCase.props.children[0].props.value).to.equal('')
        expect(this.withInput.props.children[0].props.value).to.equal(this.testInput)
    })

    it('Should pass props.creationError to TextField errorText', function createIncidentDisplayCreationError () {
        expect(this.defaultCase.props.children[0].props.errorText).to.equal('')
        expect(this.withError.props.children[0].props.errorText).to.equal(this.testError)
    })
})

const inputState = {
    tickets: {
        map: {
            1: {id:100}
        },
        systems: {
            1: {id: 1},
            2: {id: 2}
        }
    },
    incidents: {
        creation: {
            input: 'test input',
            error: {
                message: 'test error message'
            }
        }
    }
}

const expectedResult = {
    ticketLookup: {1: {id:100}},
    input: 'test input',
    ticketSystem: {
        id: 1
    },
    creationError: 'test error message'
}

describe('CreateIncidentMapStateToProps', () => {
    it('Should correctly generate an args object from state', () => {
        const result = mapStateToProps(inputState)

        expect(result.ticketLookup[1].id).to.equal(expectedResult.ticketLookup[1].id)
        expect(result.input).to.equal(expectedResult.input)
        expect(result.ticketSystem.id).to.equal(expectedResult.ticketSystem.id)
        expect(result.creationError).to.equal(expectedResult.creationError)
    })
})