module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/mongodb [external] (mongodb, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("mongodb", () => require("mongodb"));

module.exports = mod;
}),
"[project]/lib/mongodb.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "getDatabase",
    ()=>getDatabase
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongodb [external] (mongodb, cjs)");
;
const uri = process.env.MONGODB_URI || '';
if (!uri) {
    console.error('MONGODB_URI is not set. Please add your Mongo URI to .env.local');
}
const options = {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    connectTimeoutMS: 10000
};
let client;
let clientPromise;
// Initialize connection only if URI is available
if (uri) {
    if ("TURBOPACK compile-time truthy", 1) {
        // In development mode, use a global variable so that the value
        // is preserved across module reloads caused by HMR (Hot Module Replacement).
        let globalWithMongo = /*TURBOPACK member replacement*/ __turbopack_context__.g;
        if (!globalWithMongo._mongoClientPromise) {
            try {
                client = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["MongoClient"](uri, options);
                globalWithMongo._mongoClientPromise = client.connect().catch((err)=>{
                    // Clear the promise on error so it can be retried
                    globalWithMongo._mongoClientPromise = undefined;
                    throw err;
                });
            } catch (err) {
                console.error('Failed to create MongoDB client:', err);
                throw err;
            }
        }
        clientPromise = globalWithMongo._mongoClientPromise;
    } else //TURBOPACK unreachable
    ;
} else {
    // Create a rejected promise if URI is not set
    clientPromise = Promise.reject(new Error('MongoDB URI is not configured'));
}
const __TURBOPACK__default__export__ = clientPromise;
async function getDatabase() {
    // Re-read URI from environment in case it was updated
    const currentUri = process.env.MONGODB_URI || '';
    if (!currentUri) {
        throw new Error('MongoDB URI is not configured. Please set MONGODB_URI in .env.local and restart the server.');
    }
    try {
        // Wait for client connection
        const client = await clientPromise;
        // Verify client is connected
        if (!client) {
            throw new Error('MongoDB client is not initialized');
        }
        // Extract database name from URI or use default
        // URI format: mongodb+srv://user:pass@cluster/dbname?options
        const dbNameMatch = currentUri.match(/\/\/(?:[^@]+@)?[^/]+\/([^?]+)/);
        const dbName = dbNameMatch?.[1] || 'rural_healthcare';
        const db = client.db(dbName);
        // Test the connection with a simple operation (without admin ping which might fail)
        // Just return the db - the actual operation will test the connection
        return db;
    } catch (error) {
        console.error('MongoDB connection error details:', {
            message: error.message,
            name: error.name,
            code: error.code,
            errorResponse: error.errorResponse
        });
        // Provide more specific error messages
        if (error.message?.includes('authentication failed') || error.code === 8000 || error.errorResponse?.code === 8000) {
            throw new Error('MongoDB authentication failed. Please verify: 1) Username and password in MongoDB Atlas Database Access, 2) User has correct privileges, 3) Connection string in .env.local matches Atlas. Get the connection string from Atlas Dashboard → Connect → Connect your application.');
        } else if (error.message?.includes('timeout') || error.code === 'ETIMEDOUT') {
            throw new Error('MongoDB connection timeout. Please check your network connection and firewall settings.');
        } else if (error.message?.includes('ENOTFOUND') || error.message?.includes('getaddrinfo') || error.code === 'ENOTFOUND') {
            throw new Error('Cannot reach MongoDB server. Please check your network connection and cluster address.');
        } else if (error.message?.includes('MongoServerError')) {
            throw new Error(`MongoDB server error: ${error.message}`);
        } else {
            throw new Error(`MongoDB connection failed: ${error.message || 'Unknown error'}. Please check your .env.local file and restart the server.`);
        }
    }
}
}),
"[project]/app/api/auth/signup/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/bcryptjs/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mongodb.ts [app-route] (ecmascript)");
;
;
;
async function POST(request) {
    try {
        const body = await request.json();
        const { role, email, password, ...otherData } = body;
        // Validate required fields
        if (!email || !password) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Email and password are required'
            }, {
                status: 400
            });
        }
        if (![
            'patient',
            'health-worker',
            'admin'
        ].includes(role)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Invalid role'
            }, {
                status: 400
            });
        }
        // Validate password length
        if (password.length < 6) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Password must be at least 6 characters'
            }, {
                status: 400
            });
        }
        let db;
        try {
            db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDatabase"])();
        } catch (dbError) {
            console.error('Database connection error:', {
                message: dbError?.message,
                code: dbError?.code,
                errorResponse: dbError?.errorResponse
            });
            let errorMessage = dbError?.message || 'Database connection failed.';
            // Provide helpful error messages
            if (dbError?.message?.includes('authentication failed') || dbError?.code === 8000 || dbError?.errorResponse?.code === 8000) {
                errorMessage = 'MongoDB authentication failed. Please: 1) Verify username/password in MongoDB Atlas → Database Access, 2) Get connection string from Atlas → Connect → Connect your application, 3) Update .env.local and restart server.';
            } else if (dbError?.message?.includes('timeout')) {
                errorMessage = 'Connection timeout. Please check your network connection.';
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: errorMessage
            }, {
                status: 500
            });
        }
        // Test the connection with a simple operation
        try {
            await db.admin().ping();
        } catch (pingError) {
            // If ping fails, try a simple collection operation instead
            console.log('Admin ping failed, trying collection operation...');
        }
        const usersCollection = db.collection('users');
        // Check if user already exists
        const existingUser = await usersCollection.findOne({
            email
        });
        if (existingUser) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'User with this email already exists'
            }, {
                status: 400
            });
        }
        // Hash password
        const hashedPassword = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].hash(password, 10);
        // Create user document based on role
        const now = new Date();
        let userDoc;
        if (role === 'patient') {
            userDoc = {
                email,
                password: hashedPassword,
                role: 'patient',
                fullName: otherData.fullName || '',
                phoneNumber: otherData.phoneNumber,
                dateOfBirth: otherData.dateOfBirth ? new Date(otherData.dateOfBirth) : undefined,
                address: otherData.address,
                createdAt: now,
                updatedAt: now
            };
        } else if (role === 'health-worker') {
            userDoc = {
                email,
                password: hashedPassword,
                role: 'health-worker',
                fullName: otherData.fullName || '',
                phoneNumber: otherData.phoneNumber || '',
                qualification: otherData.qualification || '',
                registrationNumber: otherData.registrationNumber || '',
                hospitalClinicName: otherData.hospitalClinicName || '',
                district: otherData.district || '',
                village: otherData.village || '',
                yearsOfExperience: otherData.yearsOfExperience || '',
                specializedStream: otherData.specializedStream || '',
                governmentIdFileName: otherData.governmentIdFileName,
                proofFileName: otherData.proofFileName,
                status: 'pending',
                appliedDate: now,
                denialReason: undefined,
                createdAt: now,
                updatedAt: now
            };
        } else {
            // Admin (for future use)
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Admin registration not allowed through this endpoint'
            }, {
                status: 403
            });
        }
        // Insert user into database
        const result = await usersCollection.insertOne(userDoc);
        // Return success (don't return password)
        const { password: _, ...userWithoutPassword } = userDoc;
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: 'User created successfully',
            user: {
                ...userWithoutPassword,
                _id: result.insertedId.toString()
            }
        }, {
            status: 201
        });
    } catch (error) {
        console.error('Signup error:', error);
        // Handle JSON parsing errors
        if (error instanceof SyntaxError) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Invalid request data'
            }, {
                status: 400
            });
        }
        // Handle other errors
        const errorMessage = error instanceof Error ? error.message : 'Internal server error';
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: errorMessage
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__a43d3e77._.js.map