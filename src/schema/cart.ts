import { z} from 'zod'


export const CreateCartSchema = z.object({
    Pr_Id: z.number(),
    Quant: z.number()
  
})