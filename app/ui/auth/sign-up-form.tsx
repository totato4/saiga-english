export default async function SignUpForm() {
  return (
    <form>
      <label htmlFor="login">
        логин:
        <input type="login" id="login" name="login" minLength={6} required />
      </label>
      <label htmlFor="password">
        пароль:{" "}
        <input
          type="password"
          id="password"
          name="password"
          minLength={6}
          required
        />
      </label>
      <label htmlFor="replace_password">
        повторите пароль:
        <input
          type="password"
          id="replace_password"
          name="replace_password"
          minLength={6}
          required
        />
      </label>
      <label htmlFor="email">
        ваш E-Mail: <input type="email" id="email" name="email" required />
      </label>
    </form>
  );
}
