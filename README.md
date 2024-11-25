# Cat Study

Projeto de extensão com objetivo de ajudar estudantes na gestão do tempo e foco nos estudos. 
Para atingir este objetivo o App conta com uma tela de Tasks para que o usuário consiga criar sua lista de tarefas;
Tela de Pomodoro, para ajudar o estudante no foco do estudo por mais tempo com menos exaustão devido as pausas cronometradas entre os blocos de estudo.
Aplicativo encontra-se atualmente na versão 1.0

# Etapas para rodar o projeto
1. Instalar as dependências com o comando ``npm install``
2. Teste o aplicativo através do expo com o comando ``npx expo start``

# Etapas de build do app
_Obs: É necessário ter uma conta no site do expo (https://expo.dev/)._
1. Instale o EAS CLI, ferramenta do Expo para construção e distribuição de aplicativos ``npm install -g ead-cli``
2. Faça login com sua conta do expo ``eas login``
3. Configure o projeto com o comando ``ead build:configure``
4. (Opcional) Caso não seja criado o arquivo eas.json na raiz do seu projeto, crie-o para configurar o tipo da sua build .apk, dentro do arquivo utilize o código abaixo:
``
{ 
  "build": {
    "production": { 
      "android": { 
        "buildType": "apk"
      } 
    } 
  } 
}
``
5. Inicie a build do seu .apk com o comando ``ead build -p android --profile production``
6. Na sua conta do Expo você terá um link compartilhável para download do seu aplicativo .apk.