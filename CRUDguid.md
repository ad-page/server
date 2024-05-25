Svarbu:
Prieš naudojant, užtikrinkite, kad būtų paleistas serveris: npm run start

Modeliai:
user (vartotojas)
ads (skelbimai)
category (kategorijos)
comments (komentarai)

Folderiai:
middleware: autorizacija ir autentifikacija
config: duomenų bazės prisijungimas su mongoose
routes: HTTP maršrutai susieti su funkcijomis
models: schemos, duomenų struktūra
controllers: užklausų valdymas ir "smegenys"
server.js: serveris, prisijungimas prie DB, struktūra

Postman operacijos
VARTOTOJAI (USERS):
Sukurti naują vartotoją:
Metodas: POST
Adresas: http://localhost:5000/api/users
Body: raw, JSON { "username": "...", "email": "...", "password": "..." }

Prisijungti prie vartotojo:
Metodas: POST
Adresas: http://localhost:5000/api/users/login
Body: raw, JSON { "email": "...", "password": "..." }

Gauti vartotojo duomenis:
Metodas: GET
Adresas: http://localhost:5000/api/users/:user_id
Headers:
Key: authorization
Value: Bearer + Token (gaunamas prisijungiant)
Kam leidžiama ši operacija: visiems

Gauti visus vartotojus:
Metodas: GET
Adresas: http://localhost:5000/api/users/
Headers:
Key: authorization
Value: Bearer + Token (gaunamas prisijungiant)
Kam leidžiama ši operacija: admin

Ištrinti vartotoja:
Metodas: DELETE
Adresas: http://localhost:5000/api/users/:user_id
Headers:
Key: authorization
Value: Bearer + Token (gaunamas prisijungiant)
Kam leidžiama ši operacija: admin

Categories (kategorijos)
Sukurti kategorija:
Metodas: POST
Adresas: http://localhost:5000/api/categories
Headers:
Key: authorization
Value: Bearer + jwtToken (gaunamas prisijungiant)
Body: raw, JSON { "name": "..."}
Kam leidžiama ši operacija: adminams

Gauti visas kategorijas:
Metodas: GET
Adresas: http://localhost:5000/api/categories
Headers:
Key: authorization
Value: Bearer + jwtToken (gaunamas prisijungiant)
Kam leidžiama ši operacija: visiems

Ištrinti kategorija:
Metodas: DELETE
Adresas: http://localhost:5000/api/categories/:category_id
Headers:
Key: authorization
Value: Bearer + jwtToken (gaunamas prisijungiant)
Kam leidžiama ši operacija: adminams

ADS (skelbimai):
Sukurti skelbima vartotojui:
Metodas: POST
Adresas: http://localhost:5000/api/ads
Headers:
Key: authorization
Value: Bearer + jwtToken (gaunamas prisijungiant)
Body: raw, JSON { "name": "...", "category": "...", (name from list) "price": "..." (type: Number) "description": "..." (not mendatory), "images": "..." or ["...", "..."] }
Kam leidžiama ši operacija: visiems

Gauti vartotojo skelbimus:
Metodas: GET
Adresas: http://localhost:5000/api/ads/my
Headers:
Key: authorization
Value: Bearer + jwtToken (gaunamas prisijungiant)
Kam leidžiama ši operacija: visiems

Gauti visus skelbimus:
Metodas: GET
Adresas: http://localhost:5000/api/ads

Atnaujinti vartotojo skelbima:
Metodas: PUT
Adresas: http://localhost:5000/api/:ad_id
Headers:
Key: authorization
Value: Bearer + jwtToken (gaunamas prisijungiant)
Pasirenki ka nori atnaujinti: Body: raw, JSON { "name": "...", "category": "...", (id from list) "price": "..." (type: Number) "description": "..." (not mendatory), "images": "..." or ["...", "..."] }
Kam leidžiama ši operacija: vartotojui

Ištrinti vartotojo skelbima:
Metodas: DELETE
Adresas: http://localhost:5000/api/ads/:ad_id
Headers:
Key: authorization
Value: Bearer + jwtToken (gaunamas prisijungiant)
Kam leidžiama ši operacija: visiems

Comments (komentarai):
Sukurti komentara:
Metodas: POST
Adresas: http://localhost:5000/api/comments
Headers:
Key: authorization
Value: Bearer + jwtToken (gaunamas prisijungiant)
Body: raw, JSON {"comment": "...", "ad": "ad_id"}
Kam leidžiama ši operacija: visiems

Ištrinti komentara:
Methodas: DELETE
Adresas: http://localhost:5000/api/comments/:comment_id
Headers:
Key: authorization
Value: Bearer + jwtToken (gaunamas prisijungiant)
Kam leidžiama ši operacija: vartotojui