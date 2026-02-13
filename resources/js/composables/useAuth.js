import { ref, reactive } from 'vue';
import axios from 'axios';
import router from '../router';

const user = ref(null);
const errors = ref({});

export default function useAuth() {

    const getUser = async () => {
        try {
            let response = await axios.get('/api/user');
            console.log('getUser response:', response.data);
            user.value = response.data;
        } catch (error) {
            console.error('getUser error:', error);
            user.value = null;
        }
    };

    const login = async (data) => {
        errors.value = {};
        try {
            await axios.get('/sanctum/csrf-cookie');
            await axios.post('/login', data);
            await getUser();
            router.push('/');
        } catch (error) {
            if (error.response && error.response.status === 422) {
                errors.value = error.response.data.errors;
            }
        }
    };

    const register = async (data) => {
        errors.value = {};
        try {
            await axios.get('/sanctum/csrf-cookie');
            await axios.post('/register', data);
            await getUser();
            router.push('/');
        } catch (error) {
            if (error.response && error.response.status === 422) {
                errors.value = error.response.data.errors;
            }
        }
    };

    const logout = async () => {
        await axios.post('/logout');
        user.value = null;
        router.push('/login');
    };

    return {
        user,
        errors,
        getUser,
        login,
        register,
        logout
    };
}
