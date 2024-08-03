import Link from "next/link";
import { Button } from "@/registry/new-york/ui/button";
import { Input } from "@/registry/new-york/ui/input";
import { Label } from "@/registry/new-york/ui/label";
import { Textarea } from "@/registry/new-york/ui/textarea";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className='flex-center mb-5 w-full max-w-full flex-col'>
      <h1 className='head_text text-center'>
        <span className='fs-36 green_gradient'>{type} Post</span>
      </h1>
      <p className='desc max-w-md text-center'>
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform
      </p>

      <form
        onSubmit={handleSubmit}
        className='glassmorphism mt-10 flex w-full max-w-2xl flex-col gap-7 dark:bg-slate-900 dark:text-white'
      >
        <Label>
          <span className='font-satoshi text-base font-semibold text-gray-700'>
            Description
          </span>

          <Textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder='Write your post here'
            required
            className='form_textarea '
          />
        </Label>

        <Label>
          <span className='font-satoshi text-base font-semibold text-gray-700'>
            Product Tag{" "}
            <span className='font-normal'>
              (#product, #idea, etc.)
            </span>
          </span>
          <Input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            type='text'
            placeholder='#Tag'
            className='p-1'
          />
        </Label>

        <div className='mx-3 mb-5 flex items-center justify-center gap-4'>
          <Link href='/' className='flex items-center rounded bg-red-400 px-4 py-2 text-sm text-primary-foreground shadow hover:bg-red-600'>
            Cancel
          </Link>

          <button
            type='submit'
            disabled={submitting}
            className='rounded bg-primary px-5 py-2 text-sm text-white dark:text-black'
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
