<template>
  <q-page class="flex flex-col items-center justify-center">
    <div class="q-pa-md" style="max-width: 400px; margin: 8px">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input
          filled
          v-model="username"
          label="Account"
          hint="Username"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Please type your username',
          ]"
        />

        <q-input
          filled
          v-model="password"
          hint="Password"
          label="Password"
          :rules="[
            (val) =>
              /^(?=.*[a-zA-Z])(?=.*\d).+$/.test(val) ||
              'Must contain at least one letter and one number',
          ]"
        />

        <q-checkbox v-model="rememberMe" label="Remember me" />

        <div>
          <q-btn label="Submit" type="submit" color="primary" />
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </div>
    <q-dialog v-model="alert" :position="'top'">
      <q-card class="bg-red text-white">
        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Wrong username or password.
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-btn
      color="primary"
      icon="login"
      label="Line Login"
      @click="handleLineLoginButtonClick"
    />
  </q-page>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import axios from 'axios';
import { encode } from 'querystring';
import { useRouter } from 'vue-router';
import { mutateCreateUser } from '../api/helper';
import liff from '@line/liff';

const router = useRouter();
const rememberMe = ref(true);
const username = ref('');
const password = ref('');
const alertDialog = ref(false);
const env = import.meta.env;
console.log(env);

liff
  .init({
    liffId: '2002732079-VG0J9B6k',
  })
  .then(() => {
    var isInClient = liff.isInClient();
    console.log('isInClient', isInClient);
  })
  .catch((e) => {
    console.log('初始化失敗' + e);
  });

const onSubmit = async () => {
  const resp = await mutateCreateUser(username.value, password.value);
  console.log(resp);

  if (resp?.data?.retrieveToken.ok) {
    localStorage.setItem('accessToken', resp.data.retrieveToken.token);
    router.push({ name: 'HomePage' });
  } else {
    alertDialog.value = true;
  }
};

const onReset = () => {
  username.value = '';
  password.value = '';
  rememberMe.value = false;
};

const handleLineLoginButtonClick = () => {
  let URL = 'https://access.line.me/oauth2/v2.1/authorize?';
  URL += 'response_type=code';

  //channel id
  URL += `&client_id=${env.VITE_LINE_CLIENT_ID}`;

  // 與Line Developer Channel設定的一樣就好，驗證完就會經過瀏覽器轉址回來
  URL += `&redirect_uri=${env.VITE_REDIRECT_URI}`;

  // 狀態碼是會從client呼叫端帶到驗證端，再從驗證端帶回
  // 因此應該可以作為一個亂數卡控確保是自   已丟出去的交易碼
  URL += '&state=beanyou_test';

  //要求存取的範圍
  URL += '&scope=openid%20profile';
  window.location.href = URL;
};

onBeforeMount(() => {
  checkLineLoginCallBack();
});

const checkLineLoginCallBack = () => {
  const urlParams = new URLSearchParams(window.location.search);
  console.log(window.location.search);
  if (urlParams.has('state') && urlParams.has('code')) {
    const state = urlParams.get('state');
    const code = urlParams.get('code');
    if (state === 'beanyou_test') {
      const URL = 'https://api.line.me/oauth2/v2.1/token?';
      const getTokenUrl = `${URL}grant_type=authorization_code&code=${code}&redirect_uri=${env.VITE_REDIRECT_URI}&&client_secret=${env.VITE_LINE_CLIENT_SECRET}`;
      const getTokenBody = encode({
        grant_type: 'authorization_code',
        code,
        redirect_uri: env.VITE_REDIRECT_URI,
        client_id: '2002732079',
        client_secret: '42eea519cbe4d041b09de656b64e6c36',
      });
      axios
        .post(getTokenUrl, getTokenBody)
        .then((e1) => {
          const token = e1.data.access_token;
          const idToken = e1.data.id_token;
          console.log(e1);
          const getProfileApiUrl = 'https://api.line.me/v2/profile';
          axios({
            method: 'GET',
            url: getProfileApiUrl,
            responseType: 'json',
            headers: {
              client_id: '2002732079',
              Authorization: `Bearer ${token}`,
            },
          })
            .then((e2) => {
              console.log(
                `line user id: ${e2.data.userId}, display name:${e2.data.displayName}`
              );

              const getVerifyApiUrl = 'https://api.line.me/oauth2/v2.1/verify';
              const getVerifyBody = encode({
                client_id: '2002732079',
                id_token: idToken,
              });
              axios
                .post(getVerifyApiUrl, getVerifyBody)
                .then((e3) => {
                  console.log(`line email: ${e3.data.email}`);
                })
                .catch((error) => {
                  console.log(`error: ${error}`);
                });
            })
            .catch((error) => {
              console.log(`error: ${error}`);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
};
</script>
