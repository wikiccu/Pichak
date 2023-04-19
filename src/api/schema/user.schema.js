import { boolean, object, string } from 'zod';
export const createUserSchema = object({
    body: object({
        name: string({ required_error: 'Name is required' }),
        family: string({ required_error: 'Family is required' }),
        username: string({ required_error: 'Username is required' })
            .regex(/^[a-z.0-9_-]{6,20}$/gm, 'Invalid username'),
        mobile: string()
            .regex(/09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/, 'mobile is not valid')
            .optional(),
        password: string({ required_error: 'Password is required' })
            .min(8, 'Password must be more than 8 characters')
            .max(32, 'Password must be less than 32 characters'),
        passwordConfirm: string({ required_error: 'Please confirm your password' })
    }).refine((data) => data.password === data.passwordConfirm, {
        path: ['passwordConfirm'],
        message: 'Passwords do not match'
    })
});
export const loginUserSchema = object({
    body: object({
        username: string({ required_error: 'Username is required' }),
        password: string({ required_error: 'Password is required' })
            .min(8, 'Invalid username or password')
    })
});
export const approveSchema = object({
    body: object({
        id: string({ required_error: 'Id is required' })
            .regex(/^[0-9a-fA-F]{24}$/, 'Id is not valid'),
        approve: boolean({ required_error: 'Approve is required' })
    })
});
