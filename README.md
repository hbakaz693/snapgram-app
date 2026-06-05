<h2>1. Présentation du projet</h2>
<p>
  <strong>Snapgram</strong> est une application mobile de type réseau social inspirée d’Instagram,
  développée avec React Native, Expo et Spring Boot.
</p>

<h2>2. Objectif de l'application</h2>
<p>
  L’objectif de cette application est de permettre aux utilisateurs de partager des posts,
  des reels, des stories, d’interagir avec d’autres utilisateurs et de communiquer par messages.
</p>

<h2>3. Fonctionnalités principales</h2>
<ul>
  <li>Authentification</li>
  <li>Posts</li>
  <li>Reels</li>
  <li>Stories</li>
  <li>Profil utilisateur</li>
  <li>Recherche</li>
  <li>Messages</li>
  <li>Likes / Commentaires</li>
</ul>


<h2>4. Technologies utilisées</h2>

<h3>Frontend Mobile</h3>
<p>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="50" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="50" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="50" />
</p>

<ul>
  <li>React Native</li>
  <li>Expo</li>
  <li>TypeScript</li>
</ul>

<h3>Backend</h3>
<p>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" width="50" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" width="50" />
</p>

<ul>
  <li>Java</li>
  <li>Spring Boot</li>
  <li>REST API</li>
</ul>

<h3>Base de données</h3>
<p>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg" width="50" />
</p>

<ul>
  <li>SQL Server</li>
</ul>

<h2>6. Structure des dossiers</h2>

<pre>
Snapgram/
├── frontend/
│   ├── app/
│   ├── components/
│   ├── constants/
│   └── assets/
│
├── backend/
│   ├── controller/
│   ├── model/
│   ├── repository/
│   ├── service/
│   ├── config/
│   └── uploads/
</pre>

<h2>7. Installation et lancement</h2>

<h3>Backend</h3>

<pre>
cd backend
mvn spring-boot:run
</pre>

<h3>Frontend</h3>

<pre>
cd frontend
npm install
npx expo start
</pre>

<h2>8. Configuration</h2>

<ul>
  <li><strong>Base URL :</strong> URL du backend Spring Boot</li>
  <li><strong>CORS :</strong> autoriser les requêtes du frontend mobile</li>
  <li><strong>Uploads :</strong> dossier pour stocker les images et vidéos</li>
</ul>
