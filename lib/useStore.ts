import create from 'zustand';

export const useStore = create((set) => ({
  form: {
    username: '',
    email: '',
    password: '',
  },
  setFormField: (field, value) =>
    set((state) => ({
      form: {
        ...state.form,
        [field]: value,
      },
    })),
}));
