// Módulo de autenticação com criptografia SHA-256 (Web Crypto API)

// Função para gerar hash SHA-256 de uma string
async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
          return hashHex;
          }

          // Gera um salt aleatório
          function generateSalt() {
            const array = new Uint8Array(16);
              crypto.getRandomValues(array);
                return Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
                }

                // Hash com salt para maior segurança
                async function hashPassword(password, salt) {
                  if (!salt) {
                      salt = generateSalt();
                        }
                          const hash = await sha256(salt + password);
                            return { hash, salt };
                            }

                            // Verifica se a senha corresponde ao hash
                            async function verifyPassword(password, storedHash, salt) {
                              const { hash } = await hashPassword(password, salt);
                                return hash === storedHash;
                                }

                                // Usuários pré-cadastrados com senhas hasheadas
                                // Senha padrão: "hubstrom2026"
                                // Para gerar novos hashes, use: await hashPassword("suaSenha")
                                const USERS_DB = {
                                  admin: {
                                      name: "Administrador",
                                          role: "admin",
                                              salt: "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6",
                                                  // hash de "hubstrom2026" com o salt acima
                                                      hash: null // será calculado na inicialização
                                                        },
                                                          daiana: {
                                                              name: "Daiana Ozeki",
                                                                  role: "manager",
                                                                      salt: "f1e2d3c4b5a6f7e8d9c0b1a2f3e4d5c6",
                                                                          hash: null
                                                                            }
                                                                            };

                                                                            // Inicializa os hashes dos usuários
                                                                            async function initUsers() {
                                                                              const adminResult = await hashPassword("hubstrom2026", USERS_DB.admin.salt);
                                                                                USERS_DB.admin.hash = adminResult.hash;

                                                                                  const daianaResult = await hashPassword("hubstrom2026", USERS_DB.daiana.salt);
                                                                                    USERS_DB.daiana.hash = daianaResult.hash;
                                                                                    }

                                                                                    // Inicializa na importação
                                                                                    const initPromise = initUsers();

                                                                                    // Login - verifica credenciais
                                                                                    export async function login(username, password) {
                                                                                      await initPromise;

                                                                                          const user = USERS_DB[username.toLowerCase()];
                                                                                            if (!user) {
                                                                                                return { success: false, error: "Usuário não encontrado" };
                                                                                                  }

                                                                                                    const isValid = await verifyPassword(password, user.hash, user.salt);
                                                                                                      if (!isValid) {
                                                                                                          return { success: false, error: "Senha incorreta" };
                                                                                                            }
                                                                                                            
                                                                                                              // Cria token de sessão
                                                                                                                const sessionToken = generateSalt() + generateSalt();
                                                                                                                  const sessionData = {
                                                                                                                      username: username.toLowerCase(),
                                                                                                                          name: user.name,
                                                                                                                              role: user.role,
                                                                                                                                  token: sessionToken,
                                                                                                                                      loginAt: new Date().toISOString(),
                                                                                                                                          expiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString() // 8 horas
                                                                                                                                            };
                                                                                                                                            
                                                                                                                                              sessionStorage.setItem('hubstrom_session', JSON.stringify(sessionData));
                                                                                                                                                return { success: true, user: sessionData };
                                                                                                                                                }
                                                                                                                                                
                                                                                                                                                // Verifica se o usuário está autenticado
                                                                                                                                                export function isAuthenticated() {
                                                                                                                                                  try {
                                                                                                                                                      const session = sessionStorage.getItem('hubstrom_session');
                                                                                                                                                          if (!session) return false;
                                                                                                                                                          
                                                                                                                                                              const data = JSON.parse(session);
                                                                                                                                                                  const now = new Date();
                                                                                                                                                                      const expires = new Date(data.expiresAt);
                                                                                                                                                                      
                                                                                                                                                                          if (now > expires) {
                                                                                                                                                                                sessionStorage.removeItem('hubstrom_session');
                                                                                                                                                                                      return false;
                                                                                                                                                                                          }
                                                                                                                                                                                          
                                                                                                                                                                                              return true;
                                                                                                                                                                                                } catch {
                                                                                                                                                                                                    return false;
                                                                                                                                                                                                      }
                                                                                                                                                                                                      }
                                                                                                                                                                                                      
                                                                                                                                                                                                      // Retorna dados do usuário logado
                                                                                                                                                                                                      export function getCurrentUser() {
                                                                                                                                                                                                        try {
                                                                                                                                                                                                            const session = sessionStorage.getItem('hubstrom_session');
                                                                                                                                                                                                                if (!session) return null;
                                                                                                                                                                                                                    return JSON.parse(session);
                                                                                                                                                                                                                      } catch {
                                                                                                                                                                                                                          return null;
                                                                                                                                                                                                                            }
                                                                                                                                                                                                                            }
                                                                                                                                                                                                                            
                                                                                                                                                                                                                            // Logout
                                                                                                                                                                                                                            export function logout() {
                                                                                                                                                                                                                              sessionStorage.removeItem('hubstrom_session');
                                                                                                                                                                                                                              }
