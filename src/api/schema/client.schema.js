import { number, object, string } from 'zod'
export const signupInputSchema = object({
  body: object({
    mobile: string({ required_error: 'mobile is required' })
      .regex(/09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/, 'mobile is not valid')
  })
})
export const clientLoginSchema = object({
  body: object({
    mobile: string({ required_error: 'mobile is required' })
      .regex(/09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/, 'mobile is not valid'),
    code: string({ required_error: 'Code is required' })
      .min(5, 'Invalid code')
  })
})
export const clientRequestSchema = object({
  body: object({
    files: string({ required_error: 'Files is required' }).array(),
    address: string({ required_error: 'Address is required' }),
    lat: number({ required_error: 'Lat is required' }).min(-90).max(90),
    long: number({ required_error: 'Long is required' }).min(-180).max(180),
    description: string().optional()
  })
})
