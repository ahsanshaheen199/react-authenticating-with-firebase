import React, { useState, useContext } from 'react'
import { Card, Button, Form, Alert } from 'react-bootstrap'
import { AuthContext } from '../contexts/AuthContext'
import { auth } from '../firebase'

function Signup() {
    const [formControlData, setformControlData] = useState({
        email: '',
        password: '',
        passwordConfirm: '',
    })

    const { currentUser } = useContext(AuthContext)

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const userSubmit = async ( event ) => {
        event.preventDefault();
         
        if( formControlData.password !== formControlData.passwordConfirm) {
            return setError('Password do not match')
        }
        try {
            setError('')
            setLoading(true)
            await auth.createUserWithEmailAndPassword(formControlData.email,formControlData.password)
        } catch ( error ) {
            console.log(error);
            setError(error.message)
        }

        setLoading(false)
    }
    
    const formData = ( event ) => {
        setformControlData({
            ...formControlData,
            [event.target.name]: event.target.value
        })
    }
    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    { error && <Alert variant="danger">{error}</Alert> }
                    <Form onSubmit={userSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control name="email" onChange={formData} value={formControlData.email} type="email" required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" onChange={formData} value={formControlData.password} type="password" required />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control name="passwordConfirm" onChange={formData} value={formControlData.passwordConfirm} type="password" required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">Submit</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account ? Log In
            </div>
        </>
    )
}

export default Signup
