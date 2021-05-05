import {getCaptcha, doLogin, getAdminInfo} from "../../api/login";
import auth from "../../utils/auth";

let login = {
    data() {
        return {
            //url请求路径
            base64Str: '',
            //登录表单
            loginForm: {
                //设置默认值 防止后台空指针
                username: '',
                password: '',
                uuid: '',
                captcha: '',
            },
        }
    },
    created() {
        this.getCaptcha();
    },
    methods: {

        /**
         * 获取验证码
         * @returns {Promise<void>}
         */
        async getCaptcha() {
            //获取验证码 把验证码赋值给登录表单
            this.loginForm.uuid = this.guid();
            this.base64Str = await getCaptcha(this.loginForm.uuid);
        },


        /**
         * 获取uuid
         * @returns {string}
         */
        guid() {
            function S4() {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            }

            return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
        },

        /**
         * 登录
         */
        async doLogin() {
            let token = await doLogin(this.loginForm)
            auth.setToken(token);
            this.getAdminInfo();
            // 登录成功
            // this.$router.push("/")

        },

        /**
         * 获取用户信息
         * @returns {Promise<void>}
         */
        async getAdminInfo() {
            let response = await getAdminInfo()
            // auth.setUserInfo(response.admin);
            // auth.setMenuList(response.menuList);
            // auth.setBtnPerms(response.btnPerm);
            console.log(response)
            localStorage.setItem("userInfo",JSON.stringify(response.admin))
            localStorage.setItem("menuList",JSON.stringify(response.menuList))
            localStorage.setItem("btnPerm",JSON.stringify(response.btnPerm))
            this.$router.push("/")

        }


    },


}


export default login;