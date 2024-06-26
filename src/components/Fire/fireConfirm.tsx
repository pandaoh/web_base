import React, { ReactNode } from 'react';
import { Modal, ModalProps } from 'antd';
import { fire } from './index';

type CombinedProps = ModalProps & {
  content?: ReactNode;
  onConfirm?: any;
  [key: string]: any;
};

const FireConfirmDialog = (props: CombinedProps) => {
  const onOK = props?.onOk || props?.onConfirm || props?.onCancel;
  console.log({ props });
  return (
    <Modal centered wrapClassName="fireConfirm" style={{ top: '-15%' }} {...props} onOk={onOK}>
      {props?.content}
    </Modal>
  );
};

export const fireConfirm = fire(FireConfirmDialog);
