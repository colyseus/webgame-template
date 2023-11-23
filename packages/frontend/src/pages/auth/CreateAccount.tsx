
function CreateAccount() {
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  };

  return (
    <>
      <h2 className="text-xl mb-2">Create account</h2>
      <form onSubmit={onSubmit} className="flex mb-8">
        <div className="flex gap-2">
          <input className="p-2 rounded" type="text" name="email" placeholder="Email" />
          <input className="p-2 rounded" type="password" name="password" placeholder="Password" />
          <button type="submit" className="p-2 rounded bg-slate-100 text-gray-800">Create account</button>
        </div>
      </form>

    </>
  )
}

export default CreateAccount
