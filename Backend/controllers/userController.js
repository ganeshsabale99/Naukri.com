const User = require("../models/User");

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
};

// Get All user profile
const getAllUserProfile = async (req, res) => {
  try {
    const user = await User.find();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  const userId = req.user;
  try {
    const { name, mobileNumber } = req.body;

    const UpdateData = await User.findByIdAndUpdate(
      { id: userId },
      {
        name: name,
        mobileNumber: mobileNumber,
      },
      {
        new: true,
      }
    );

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log("userId", userId);
    res.send({ user: user });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Delete user (admin only)
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};

//addNewLedgerEntry

const addLedgerEntry = async (req, res) => {
  try {
    const userId = req.params.id;

    const { particular, total, debit, credit, balance } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newEntry = {
      particular,
      total,
      debit,
      credit,
      balance,
      lastModified: new Date(),
    };

    user.ledger.push(newEntry);

    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to add ledger entry" });
  }
};
const updateLedgerEntry = async (req, res) => {
  try {
    const userId = req.params.id;
    const entryId = req.params.entryId;
    const { particular, debit, credit } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const entryIndex = user.ledger.findIndex(
      (entry) => entry.id.toString() === entryId
    );

    if (entryIndex === -1) {
      return res.status(404).json({ error: "Ledger entry not found" });
    }

    user.ledger[entryIndex].particular = particular;

    user.ledger[entryIndex].debit = debit;
    user.ledger[entryIndex].credit = credit;

    user.ledger[entryIndex].lastModified = new Date();

    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to update ledger entry" });
  }
};

// Get All info for dashboard
const getDashboard = async (req, res) => {
  try {
    const user = await User.find({ role: "customer" });
    const totalUsers = user.length - 1;

    let TotalRevenue = 0;

    user.map((ele) => {
      TotalRevenue += ele.remainingDue;
    });
    console.log(TotalRevenue);
    res
      .status(200)
      .send({ user: user, totalUsers: totalUsers, TotalRevenue: TotalRevenue });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  deleteUser,
  getAllUserProfile,
  getDashboard,
  addLedgerEntry,
  updateLedgerEntry,
};
