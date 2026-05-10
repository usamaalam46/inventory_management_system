const prisma =require("../../config/prisma");

const bcrypt =require("bcrypt");

const jwt =require("jsonwebtoken");


// ✅ REGISTER
exports.register =
  async (req, res) => {

    try {

      const {
        name,
        email,
        password,
        role
      } = req.body;

      // check existing user
      const existing =
        await prisma.user.findUnique({
          where: { email }
        });

      if (existing) {

        return res.status(400).json({
          message:
            "Email already exists"
        });
      }

      // hash password
      const hash =
        await bcrypt.hash(
          password,
          10
        );

      // create user
      const user =
        await prisma.user.create({

          data: {

            name,

            email,

            password: hash,

            role:
              role || "sales",
          }
        });

      return res.status(201).json({

        message:
          "User registered successfully",

        user: {

          id:
            user.id,

          name:
            user.name,

          email:
            user.email,

          role:
            user.role,
        }
      });

    } catch (error) {

      console.log(
        "REGISTER ERROR:",
        error
      );

      return res.status(500).json({
        message: error.message
      });
    }
  };


// ✅ LOGIN
exports.login =
  async (req, res) => {

    try {

      const {
        email,
        password
      } = req.body;

      // find user
      const user =
        await prisma.user.findUnique({
          where: { email }
        });

      if (!user) {

        return res.status(404).json({
          message:
            "User not found"
        });
      }

      // compare password
      const match =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!match) {

        return res.status(401).json({
          message:
            "Invalid password"
        });
      }

      // generate token
      const token = jwt.sign(

        {
          id: user.id,
          role: user.role,
        },

        process.env.JWT_SECRET,

        {
          expiresIn: "7d"
        }
      );

      return res.json({

        token,

        user: {

          id:
            user.id,

          name:
            user.name,

          email:
            user.email,

          role:
            user.role,
        }
      });

    } catch (error) {

      console.log(
        "LOGIN ERROR:",
        error
      );

      return res.status(500).json({
        message: error.message
      });
    }
  };