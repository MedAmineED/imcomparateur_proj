"use client";
import React, { FC, useState } from 'react';
import { Card, Row, Col, Input, Select, Button, Spin } from 'antd';
import styles from './Comparator.module.css';
import RegisterForm from '../components/register/RegisterForm';
import { useRouter } from 'next/navigation';

const { Option } = Select;

const Page: FC = () => {
  const router = useRouter();   
  const [formData, setFormData] = useState({
    age: '',
    postalCode: '',
    sex: '',
  });
  const [isLoading, setIsLOading] = useState(false);

  const onCompare = ()=> {
      //start loadinga stop after 5s
      setIsLOading(true);
      setTimeout(()=>{
          setIsLOading(false);
          router.push('/comparator/results');
      }, 5000);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className={styles.container}>
      <div className={styles.animatedText}>
        <p> Découvrez la meilleure option pour vous !</p>
      </div>
      <div className={styles.movingCircles}></div>

      <div className={styles.decorativeCards}>
        <Card className={styles.decorativeCard} />
        <Card className={styles.decorativeCard} />
      </div>

      <Card
        title="Comparateur d'Assurance"
        className={`${styles.card} ${styles.glassCard}`} // Apply both card and glassCard styles
        hoverable
      >
        <form onSubmit={handleSubmit}>
          <Row gutter={[0, 16]}>
            <Col span={24}>
              <label className={styles.label}>Sexe</label>
              <Select
                placeholder="Sélectionnez votre sexe"
                className={`${styles.input} ${styles.glassInput}`} // Apply both input and glassInput styles
                onChange={(value) => setFormData({ ...formData, sex: value })}
              >
                <Option value="M">Homme</Option>
                <Option value="F">Femme</Option>
              </Select>
            </Col>
            <Col span={24}>
              <label className={styles.label}>Âge</label>
              <Input
                type="number"
                placeholder="Entrez votre âge"
                value={formData.age}
                className={`${styles.input} ${styles.glassInput}`} // Apply both input and glassInput styles
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                min="0"
                max="120"
              />
            </Col>
            <Col span={24}>
              <label className={styles.label}>Code Postal</label>
              <Input
                placeholder="Ex: 75001"
                value={formData.postalCode}
                className={`${styles.input} ${styles.glassInput}`} // Apply both input and glassInput styles
                onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                maxLength={5}
                pattern="[0-9]*"
              />
            </Col>
            <Col span={24}>
            <RegisterForm onCompare = {onCompare}>
              <Button
                type="primary"
                htmlType="submit"
                block
                className={styles.largeAnimatedButton}
              >
                Comparer les offres {isLoading && <Spin percent={-50} size="large" />}
              </Button>
              </RegisterForm>
            </Col>
          </Row>
        </form>
      </Card>

      <div className={styles.footerText}>
        <p> Explorez des options personnalisées pour chaque étape de votre vie.</p>
      </div>
    </div>
  );
};

export default Page;