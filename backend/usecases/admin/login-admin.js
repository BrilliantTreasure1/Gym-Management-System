const bcrypt = require("bcrypt");

class GetAdminForAuth {
  constructor(adminRepository) {
    this.adminRepository = adminRepository;
  }

  async execute(phoneNumber, password) {

    const admin = await this.adminRepository.getUserBynumber(phoneNumber);
    if (!admin) return null;

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return null;

    const { password: adminPassword, ...safeUser } = admin;

    return safeUser;
  }
}

module.exports = GetAdminForAuth;
