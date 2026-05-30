# Guide Technique - MaPharmacie

## 📋 Structure de l'application

```
kazadi_banza_examen_Mapharmacie/
├── index.html           # Page principale (40 KB)
├── manifest.json        # Configuration PWA
├── sw.js               # Service Worker (cache hors ligne)
├── whatsapp_qr.png     # QR code WhatsApp
├── INSTALLATION.md     # Guide utilisateur
├── GUIDE_TECHNIQUE.md  # Ce fichier
└── package.json        # Métadonnées du projet
```

## 🔧 Technologies utilisées

- **HTML5** - Structure sémantique
- **CSS3** - Design responsive et animations
- **JavaScript Vanilla** - Logique métier (aucune dépendance externe)
- **Service Worker** - Fonctionnement hors ligne
- **LocalStorage** - Stockage local des données
- **PWA** - Installation native sur téléphone

## 📱 Compatibilité

- ✅ Android 5.0+ (itel version 13+)
- ✅ iOS 11.3+
- ✅ Chrome, Firefox, Safari, Edge
- ✅ Tous les navigateurs modernes

## 🎨 Architecture de l'interface

### Pages principales

1. **Page d'accueil** (`#homePage`)
   - Affichage du catalogue
   - Filtrage par catégorie
   - Grille responsive de médicaments

2. **Page Panier** (`#cartPage`)
   - Liste des articles
   - Modification des quantités
   - Calcul du total avec frais

3. **Page Paiement** (`#checkoutPage`)
   - Formulaire de livraison
   - Sélection du mode de paiement
   - Affichage du QR code WhatsApp

4. **Page Profil** (`#profilePage`)
   - Informations utilisateur
   - Historique des commandes
   - Déconnexion

## 💾 Gestion des données

### LocalStorage

```javascript
// Panier
localStorage.getItem('cart')     // Array de produits
localStorage.setItem('cart', JSON.stringify(cart))

// Utilisateur
localStorage.getItem('user')     // Objet utilisateur
localStorage.setItem('user', JSON.stringify(user))

// Commandes
localStorage.getItem('orders')   // Array de commandes
```

### Structure des objets

**Médicament**
```javascript
{
  id: 1,
  name: "Paracétamol 500mg",
  price: 2500,           // En Francs Congolais
  category: "douleur",
  emoji: "💊",
  description: "Antalgique efficace"
}
```

**Article du panier**
```javascript
{
  ...medicine,
  quantity: 2
}
```

**Commande**
```javascript
{
  id: 1622000000000,
  user: { name, email, phone, address, city },
  items: [{ ...medicine, quantity }],
  total: 15000,          // En FC
  paymentMethod: "whatsapp",
  date: "29/05/2026",
  status: "En attente"
}
```

## 🔐 Sécurité

- ✅ Aucune donnée sensible en ligne
- ✅ Données stockées localement sur le téléphone
- ✅ HTTPS recommandé en production
- ✅ Validation des formulaires côté client
- ✅ Pas d'appels API externes

## 🚀 Déploiement

### Option 1 : Serveur HTTP simple

```bash
# Démarrer le serveur
python3 -m http.server 8000

# Ou avec Node.js
npx http-server
```

### Option 2 : Hébergement cloud

L'application peut être déployée sur :
- Netlify
- Vercel
- GitHub Pages
- Firebase Hosting
- Tout serveur HTTP statique

### Configuration requise

- Serveur HTTP (Apache, Nginx, etc.)
- Support HTTPS (recommandé)
- CORS activé pour les ressources externes
- Fichiers statiques servies correctement

## 📊 Médicaments disponibles

| ID | Nom | Prix (FC) | Catégorie |
|----|-----|-----------|-----------|
| 1 | Paracétamol 500mg | 2500 | douleur |
| 2 | Ibuprofen 400mg | 3500 | douleur |
| 3 | Aspirin 100mg | 2000 | douleur |
| 4 | Sirop contre la toux | 5000 | toux |
| 5 | Pastilles gorge | 3000 | toux |
| 6 | Thermomètre numérique | 8000 | fievre |
| 7 | Vitamine C 1000mg | 4500 | fievre |
| 8 | Antacide | 3500 | digestion |
| 9 | Probiotique | 6000 | digestion |
| 10 | Pansement adhésif | 1500 | all |
| 11 | Désinfectant | 2500 | all |
| 12 | Masque chirurgical | 500 | all |

## 🔄 Flux utilisateur

```
Accueil
  ↓
Parcourir → Filtrer → Détails → Ajouter au panier
  ↓
Panier
  ↓
Modifier quantités → Supprimer articles
  ↓
Paiement
  ↓
Remplir formulaire → Choisir méthode → Confirmer
  ↓
Commande créée ✓
```

## 🎯 Fonctionnalités clés

### Filtrage par catégorie

```javascript
const filtered = medicines.filter(m => m.category === category);
```

### Calcul du total

```javascript
const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
const shipping = subtotal > 0 ? 2000 : 0;
const total = subtotal + shipping;
```

### Gestion du panier

```javascript
// Ajouter
cart.push({ ...medicine, quantity: 1 });

// Modifier quantité
item.quantity += change;

// Supprimer
cart = cart.filter(item => item.id !== medicineId);
```

## 📞 Intégration WhatsApp

Le QR code pointe vers :
```
https://wa.me/243993178961?text=Bonjour,%20je%20voudrais%20commander%20des%20médicaments
```

Remplacez le numéro pour personnaliser.

## 🛠️ Maintenance

### Ajouter un nouveau médicament

```javascript
medicines.push({
  id: 13,
  name: "Nouveau produit",
  price: 5000,
  category: "douleur",
  emoji: "💊",
  description: "Description"
});
```

### Modifier les frais de livraison

```javascript
const shipping = subtotal > 0 ? 2000 : 0;  // Changer 2000
```

### Changer le numéro WhatsApp

Dans `index.html`, ligne ~1100 :
```javascript
whatsapp_url = `https://wa.me/243993178961?text=...`;
```

## 📈 Performance

- Taille totale : ~2 MB (y compris les images)
- Temps de chargement : < 2 secondes
- Cache hors ligne : ~500 KB
- Pas de dépendances externes

## 🔍 Débogage

### Console du navigateur

```javascript
// Voir le panier
console.log(cart);

// Voir l'utilisateur
console.log(currentUser);

// Voir les commandes
console.log(JSON.parse(localStorage.getItem('orders')));

// Vider le cache
localStorage.clear();
```

### Service Worker

```javascript
// Voir les caches
caches.keys().then(names => console.log(names));

// Supprimer un cache
caches.delete('mapharmacie-v1');
```

## 🚨 Résolution des problèmes

### L'app ne s'installe pas
- Vérifier la console du navigateur pour les erreurs
- S'assurer que le manifest.json est valide
- Vérifier que le HTTPS est utilisé (si en production)

### Le Service Worker ne fonctionne pas
- Vérifier que sw.js est accessible
- Vérifier la console pour les erreurs d'enregistrement
- Vider le cache du navigateur

### Les données ne se sauvegardent pas
- Vérifier que localStorage est activé
- Vérifier l'espace disque disponible
- Vérifier la console pour les erreurs

## 📝 Licence

MIT - Libre d'utilisation et de modification

## 👨‍💻 Auteur

kazadi_banza_examen_Mapharmacie © 2026

---

Pour toute question technique, consultez la documentation officielle PWA :
https://web.dev/progressive-web-apps/
