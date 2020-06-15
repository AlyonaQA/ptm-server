import {Body, Controller, Delete, Post, UseGuards, ValidationPipe} from '@nestjs/common';
import {AuthCredentialsDto} from "./dto/auth-credentials.dto";
import {AuthService} from "./auth.service";
import {AuthGuard} from "@nestjs/passport";
import {GetUser} from "./get-user.decorator";
import {User} from "./User.entity";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }


    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.authService.signUp(authCredentialsDto);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        return this.authService.signIn(authCredentialsDto);
    }

    @UseGuards(AuthGuard())
    @Delete('/delete/user')
    deleteUser(@GetUser() user: User): Promise<void>  {
        return this.authService.deleteUser(user);
    }

}
