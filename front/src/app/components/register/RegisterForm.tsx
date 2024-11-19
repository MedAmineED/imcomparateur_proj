"use client";
import React, { useState, useRef } from 'react';
import { Form, Button, Typography, Modal } from 'antd';
import { CloseOutlined, SmileOutlined } from '@ant-design/icons';
import styles from './RegisterForm.module.css';
import VerificationCodeInputs from './VerificationCodeInputs';
import type { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import type { InputRef } from 'antd';

interface RegisterFormProps {
  onCompare: () => void;
  children: React.ReactNode;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ children, onCompare }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isVerificationVisible, setIsVerificationVisible] = useState(false);
  const [form] = Form.useForm();
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(InputRef | null)[]>([]);

  const toggleForm = () => {
    setIsVisible(!isVisible);
  };

  const onFinish = async (values: Record<string, unknown>) => {
    console.log('Success:', values);
    setIsVisible(false);
    setIsVerificationVisible(true);
  };
 
  const onFinishFailed = (errorInfo: ValidateErrorEntity<Record<string, unknown>>) => {
    console.log('Failed:', errorInfo);
  };

  const handleVerificationCancel = () => {
    setIsVerificationVisible(false);
  };

  const handleVerificationOk = async () => {
    console.log('Verification code submitted:', verificationCode.join(''));
    console.log(verificationCode.join('').length)
    const validate = verificationCode.join('').length == 6;
    if(validate){
      setIsVerificationVisible(false);
      await onCompare();
    }
  };

  return (
    <>
      <div onClick={toggleForm}>{children}</div>

      {isVisible && (
        <div className={styles.overlay} onClick={toggleForm}>
          <div className={styles.card} onClick={(e) => e.stopPropagation()}>
            <CloseOutlined className={styles.closeIcon} onClick={toggleForm} />
            <Typography.Title level={2} className={styles.title}>
              Rejoignez-nous! <SmileOutlined />
            </Typography.Title>
            <Form
              form={form}
              name="registerForm"
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              {/* Rest of the form remains unchanged */}
            </Form>
          </div>
        </div>
      )}

      <Modal
        title="Code de verification"
        visible={isVerificationVisible}
        onOk={handleVerificationOk}
        onCancel={handleVerificationCancel}
        footer={[
          <Button key="back" onClick={handleVerificationCancel}>
            Annuler
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleVerificationOk}
          >
            Confirmer
          </Button>,
        ]}
        maskClosable={false} 
      >
        <VerificationCodeInputs
          verificationCode={verificationCode}
          setVerificationCode={setVerificationCode}
          inputRefs={inputRefs}
        />
      </Modal>
    </>
  );
};

export default RegisterForm;