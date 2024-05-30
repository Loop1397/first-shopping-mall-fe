import api from "../utils/api";
import * as types from "../constants/user.constants";
import { commonUiActions } from "./commonUiAction";
import * as commonTypes from "../constants/commonUI.constants";
import { useNavigate } from "react-router";
const loginWithToken = () => async (dispatch) => {};
const loginWithEmail = (payload) => async (dispatch) => {};
const logout = () => async (dispatch) => {};

const loginWithGoogle = (token) => async (dispatch) => {};

const registerUser =
  ({ email, name, password }, navigate) =>
  async (dispatch) => {
    try {
      dispatch({type:types.REGISTER_USER_REQUEST});
      const response = await api.post('/user', {email, name, password});

      // api response 받기가 실패했다면 에러 출력
      if(response.status !== 200) throw new Error(response.error);

      // 성공시 성공한거로 타입 변경
      dispatch({type:types.REGISTER_USER_SUCCESS});

      // 토스트 메세지 지정
      dispatch(commonUiActions.showToastMessage("회원가입을 완료했습니다!", "success"));

      // 리다이렉트
      // useNavigate는 함수형 컴포넌트(return으로 html 태그 쓰는곳)에서만 사용할 수 있으나, useNavigate를 콜백함수로 넘겨주면 여기에서도 사용 가능함
      navigate('/login');

    } catch(error) {
      dispatch({
        type:types.REGISTER_USER_FAIL, 
        payload:error.error
      });
    }
  };
export const userActions = {
  loginWithToken,
  loginWithEmail,
  logout,
  loginWithGoogle,
  registerUser,
};
