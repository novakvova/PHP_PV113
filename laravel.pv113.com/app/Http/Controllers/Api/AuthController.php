<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

use Google_Client;
use Google_Service_Oauth2;

class AuthController extends Controller
{
    /**
     * @OA\Post(
     *   path="/api/login",
     *   tags={"Auth"},
     *   summary="Login",
     *   operationId="login",
     *   @OA\RequestBody(
     *     required=true,
     *     description="User login data",
     *     @OA\MediaType(
     *       mediaType="application/json",
     *       @OA\Schema(
     *         required={"email", "password"},
     *         @OA\Property(property="email", type="string"),
     *         @OA\Property(property="password", type="string"),
     *       )
     *     )
     *   ),
     *   @OA\Response(
     *     response=200,
     *     description="Success",
     *     @OA\MediaType(
     *       mediaType="application/json"
     *     )
     *   ),
     *   @OA\Response(
     *     response=401,
     *     description="Unauthenticated"
     *   ),
     *   @OA\Response(
     *     response=400,
     *     description="Bad Request"
     *   ),
     *   @OA\Response(
     *     response=404,
     *     description="Not Found"
     *   ),
     *   @OA\Response(
     *     response=403,
     *     description="Forbidden"
     *   )
     * )
     */
    public function login(Request $request) {
        $validation = Validator::make($request->all(),[
            'email'=> 'required|email',
            'password'=> 'required|string|min:6'
        ], [
            'email.required' => 'Пошта є побов\'язковим.',
            'email.email' => 'Пошта є невалідною.',
            'password.required' => 'Пароль не може буть пустим.',
            'password.min' => 'Довжина пароля має бути мінімум 6 символів.',
        ]);
        if($validation->fails()) {
            return response()->json($validation->errors(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }
        if(!$token = auth()->attempt($validation->validated())) {
            return response()->json(['error'=>'Не вірно вказано дані!'], Response::HTTP_UNAUTHORIZED);
        }
        return response()->json(['token'=>$token], Response::HTTP_OK);
    }

    /**
     * @OA\Post(
     *   path="/api/login/google",
     *   tags={"Auth"},
     *   @OA\RequestBody(
     *     required=true,
     *     description="User login data",
     *     @OA\MediaType(
     *       mediaType="application/json",
     *       @OA\Schema(
     *         required={"name", "email", "image"},
     *         @OA\Property(property="email", type="string"),
     *         @OA\Property(property="name", type="string"),
     *         @OA\Property(property="image", type="string"),
     *       )
     *     )
     *   ),
     *   @OA\Response(
     *     response=200,
     *     description="Success",
     *     @OA\MediaType(
     *       mediaType="application/json"
     *     )
     *   ),
     *   @OA\Response(
     *     response=401,
     *     description="Unauthenticated"
     *   ),
     *   @OA\Response(
     *     response=400,
     *     description="Bad Request"
     *   ),
     *   @OA\Response(
     *     response=404,
     *     description="Not Found"
     *   ),
     *   @OA\Response(
     *     response=403,
     *     description="Forbidden"
     *   )
     * )
     */
    public function loginGoogle(Request $request)
    {
        $token = $request->token;

        // Initialize Google API client
        $client = new Google_Client(['client_secret' => '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']);

        try {
            // Verify the token
            $payload = $client->verifyIdToken($token);

            if ($payload) {
                // Token is valid
                $userId = $payload['sub']; // Get user ID

                return response()->json([
                    'user_id' => $userId,
                    'user_info' => $payload
                ], 200);
            } else {
                // Invalid token
                return response()->json(['error' => 'Invalid token'], 401);
            }
        } catch (\Exception $e) {
            // Error occurred
            return response()->json(['error' => 'Token verification failed'], 500);
        }

        return response()->json(['token' => $token], Response::HTTP_OK);

        $validation = Validator::make($request->all(), [
            'email' => 'required|email',
        ], [
            'email.required' => 'The email is required.',
            'email.email' => 'The email must be a valid email address.',
        ]);
        if ($validation->fails()) {
            return response()->json($validation->errors(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $checkUser = User::where('email', $request->email)->first();

        if (!$checkUser) {
            $imageUrl = $request->image;
            $imageContent = file_get_contents($imageUrl);

            $folderName = public_path('upload');
            if (!file_exists($folderName)) {
                mkdir($folderName, 0777);
            }

            $imageName = uniqid() . ".webp";
            $sizes = [100, 300, 500];
            $manager = new ImageManager(new Driver());
            foreach ($sizes as $size) {
                $fileSave = $size . "_" . $imageName;
                $imageRead = $manager->read($imageContent);
                $imageRead->scale(width: $size);
                $path = public_path('upload/' . $fileSave);
                $imageRead->toWebp()->save($path);
            }

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make(Str::random(100)),
                'phone' => 'Google account',
                'image' => $imageName,
            ]);

            $user->email_verified_at = now();
            $user->save();

            $token = auth()->login($user);
            return response()->json(['token' => $token], Response::HTTP_OK);

        }
        $token = auth()->login($checkUser);
        return response()->json(['token' => $token], Response::HTTP_OK);
    }


    /**
     * @OA\Post(
     *   path="/api/verification",
     *   tags={"Auth"},
     *   @OA\RequestBody(
     *     required=true,
     *     description="User verification data",
     *     @OA\MediaType(
     *       mediaType="application/json",
     *       @OA\Schema(
     *         required={"email"},
     *         @OA\Property(property="email", type="string"),
     *       )
     *     )
     *   ),
     *   @OA\Response(
     *     response=200,
     *     description="Success",
     *     @OA\MediaType(
     *       mediaType="application/json"
     *     )
     *   ),
     *   @OA\Response(
     *     response=401,
     *     description="Unauthenticated"
     *   ),
     *   @OA\Response(
     *     response=400,
     *     description="Bad Request"
     *   ),
     *   @OA\Response(
     *     response=404,
     *     description="Not Found"
     *   ),
     *   @OA\Response(
     *     response=403,
     *     description="Forbidden"
     *   )
     * )
     */
    public function verificationEmail(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'email' => 'required|email',
        ], [
            'email.required' => 'The email is required.',
            'email.email' => 'The email must be a valid email address.',
        ]);
        if ($validation->fails()) {
            return response()->json($validation->errors(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $user = User::where('email', $request->email)->first();
        $user->sendEmailVerificationNotification();

        return response()->json($user, Response::HTTP_OK);
    }

    /**
     * @OA\Get(
     *     tags={"Auth"},
     *     path="/api/users",
     *     @OA\Response(response="200", description="List Users.")
     * )
     */
    public function getList()
    {
        $data = User::all();
        return response()->json($data)
            ->header("Content-Type", 'application/json; charset=utf-8');
    }


    /**
     * @OA\Post(
     *   path="/api/register",
     *   tags={"Auth"},
     *   @OA\RequestBody(
     *     required=true,
     *     description="User register data",
     *     @OA\MediaType(
     *       mediaType="multipart/form-data",
     *       @OA\Schema(
     *         required={"name","email", "password", "image", "phone"},
     *         @OA\Property(property="name", type="string"),
     *         @OA\Property(property="email", type="string"),
     *         @OA\Property(property="password", type="string"),
     *         @OA\Property(property="image", type="file"),
     *         @OA\Property(property="phone", type="string"),
     *       )
     *     )
     *   ),
     *   @OA\Response(
     *     response=200,
     *     description="Success",
     *     @OA\MediaType(
     *       mediaType="application/json"
     *     )
     *   ),
     *   @OA\Response(
     *     response=401,
     *     description="Unauthenticated"
     *   )
     * )
     */
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'phone' => 'nullable|string|max:255',
            'image' => 'file',
        ]);

        if ($request->hasFile('image')) {
            $takeImage = $request->file('image');
            $manager = new ImageManager(new Driver());

            $filename = time();

            $sizes = [100, 300, 500];

            foreach ($sizes as $size) {
                $image = $manager->read($takeImage);
                $image->scale(width: $size, height: $size);
                $image->toWebp()->save(base_path('public/upload/' . $size . '_' . $filename . '.webp'));
            }
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'image' => $filename . '.webp',
        ]);

        $user->sendEmailVerificationNotification();

        $token = auth()->login($user);
        return response()->json(['token' => $token], Response::HTTP_CREATED);

    }
}
