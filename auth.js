const argon2 = require("argon2");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashPassword = (req, res, next) => {
  argon2
    .hash(req.body.password, hashingOptions)
    .then((hashedPassword) => {
    //   console.log(hashedPassword);

      req.body.hashedPassword = hashedPassword;
      delete req.body.password;
      next();
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const verifyPassword = (req, res) => {
  argon2
    .verify(req.user.hashedPassword, req.body.password)
    .then((isVerified) => {
      if (isVerified) {
        res.send("Credentials are valid");
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  hashPassword,verifyPassword
};


// Ce code utilise la bibliothèque argon2 pour hacher les mots de passe des utilisateurs de manière sécurisée. Le code commence par importer la bibliothèque argon2 et définir les options de hachage, telles que le type d’algorithme à utiliser (argon2.argon2id), le coût en mémoire, le coût en temps et le parallélisme.

// Ensuite, une fonction middleware hashPassword est définie. Cette fonction prend en entrée les objets req, res et next d’Express. Elle utilise la méthode .hash() de la bibliothèque argon2 pour hacher le mot de passe de l’utilisateur, qui est récupéré à partir de req.body.password. Les options de hachage définies précédemment sont également passées à cette méthode.

// Une fois que le mot de passe est haché, la fonction utilise .then() pour gérer la promesse renvoyée par .hash(). Elle stocke le mot de passe haché dans req.body.hashedPassword, supprime le mot de passe en clair de req.body et appelle la fonction next() pour passer au middleware suivant.

// Si une erreur se produit lors du hachage du mot de passe, la fonction utilise .catch() pour gérer l’erreur. Elle enregistre l’erreur dans la console et renvoie un code d’état HTTP 500 au client.

// Enfin, la fonction hashPassword est exportée à l’aide de module.exports, afin qu’elle puisse être utilisée dans d’autres parties du code.


// Le mot de passe en clair est supprimé de req.body.password pour des raisons de sécurité. Une fois que le mot de passe a été haché et stocké dans req.body.hashedPassword, il n’est plus nécessaire de conserver le mot de passe en clair. En supprimant le mot de passe en clair, on s’assure qu’il ne sera pas accidentellement exposé ou stocké dans un endroit non sécurisé. Cela réduit les risques de fuites de données sensibles et protège les informations d’identification des utilisateurs.