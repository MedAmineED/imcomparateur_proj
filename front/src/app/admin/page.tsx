"use client";
import React from 'react';
import { Button, Form, Input, Typography, Divider } from 'antd';
import styles from './Login.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const { Title } = Typography;

const Page: React.FC = () => {
    const router = useRouter();

    const navigate = () => {
        console.log("clicked")
        router.push('admin/dashboard');
    }

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <a aria-label="Aller à la page d'accueil" href="/">
                    <Image 
                        src="/images/logo-dark.png" 
                        alt="Logo" 
                        className={styles.logo}
                        width={100}
                        height={40}
                    />
                </a>
                <div className={styles.card}>
                    <Title level={4}>Connectez-vous à votre compte</Title>
                    <Form 
                        name="login" 
                        layout="vertical"
                    >
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[{ required: true, message: 'Veuillez saisir votre email!' }]}
                        >
                            <Input type="email" placeholder="Entrez votre email" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="Mot de passe"
                            rules={[{ required: true, message: 'Veuillez saisir votre mot de passe!' }]}
                        >
                            <Input type="password" placeholder="Entrez votre mot de passe" />
                        </Form.Item>

                        <Form.Item>
                            <Button onClick={navigate} type="primary" className={styles.submitButton}>
                                Se connecter
                            </Button>
                        </Form.Item>
                    </Form>

                    <Divider>Ou connectez-vous avec</Divider>

                    <div className={styles.socialButtons}>
                        <Button type="default" aria-label="Continuer avec Google">
                            <Image src="/images/google.png" width={20} height={20} alt='google'/>
                        </Button>
                    </div>
                </div>
                <div className={styles.signInPrompt}>
                    <p>
                        Vous n{"'"}avez pas encore de compte ? <a className={styles.linkCST}>S{"'"}inscrire.</a>
                    </p>
                </div>
            </main>
        </div>
    );
};

export default Page;