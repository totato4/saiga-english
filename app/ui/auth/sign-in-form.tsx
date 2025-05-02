export default async function SignInForm() {
  return (
    <form>
      <label htmlFor="login">
        логин:
        <input type="text" id="login" name="login" minLength={6} required />
      </label>
      <label htmlFor="user_password">
        пароль: <input type="password" required />
      </label>
    </form>
  );
}
