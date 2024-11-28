import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authLogout } from '../redux/userRelated/userSlice';
import styled from 'styled-components';
import { motion } from "framer-motion";
import { LogOut, X } from 'lucide-react';

const Logout = () => {
    const currentUser = useSelector(state => state.user.currentUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(authLogout());
        navigate('/');
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <LogoutContainer>
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", duration: 0.5 }}
            >
                <LogoutCard>
                    <h1>{currentUser.name}</h1>
                    <LogoutMessage>Are you sure you want to log out?</LogoutMessage>
                    <ButtonContainer>
                        <LogoutButtonLogout 
                            onClick={handleLogout}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <LogOut size={18} />
                            Log Out
                        </LogoutButtonLogout>
                        <LogoutButtonCancel 
                            onClick={handleCancel}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <X size={18} />
                            Cancel
                        </LogoutButtonCancel>
                    </ButtonContainer>
                </LogoutCard>
            </motion.div>
        </LogoutContainer>
    );
};

export default Logout;

const LogoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: #2D2B3F;
  padding: 1rem;
`;

const LogoutCard = styled.div`
  width: 350px;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(45, 43, 63, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
  color: white;

  h1 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
`;

const LogoutMessage = styled.p`
  margin-bottom: 20px;
  font-size: 16px;
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

const LogoutButton = styled(motion.button)`
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;

  &:hover {
    color: #fff;
  }
`;

const LogoutButtonLogout = styled(LogoutButton)`
  background-color: #F08080;
  &:hover {
    background-color: #F08080CC;
  }
`;

const LogoutButtonCancel = styled(LogoutButton)`
  background-color: rgba(255, 255, 255, 0.1);
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

