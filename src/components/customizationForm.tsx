import type { buildTypes, customizationFormData, themeStyles, themeTypes } from "@/types"
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import DefaultImage from "../assets/ubaidImg.jpg"
import { toast } from "sonner";
import { Textarea } from "./ui/textarea";
import { ArrowRight , Shirt } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import ImageUploader from "./imageUploader";


interface customizationFormProps {
    theme: themeTypes;
    styles: themeStyles
}

export default function CustomizationForm({ theme, styles }: customizationFormProps) {


    const [isUploadImage, setIsUploadImage] = useState<string | null>(null)

    const { register, watch, control, handleSubmit, formState: { errors } } = useForm<customizationFormData>({
        defaultValues: {
            height: 180,
            weight: 80,
            build: "athletic",
            imageUrl: null,
            customText: ""
        }
    })


    const buildOptions: buildTypes[] = [
      "lean",
      "regular",
      "athletic",
      "big"
    ]

    const watchHeight = watch("height")
    const watchWidth = watch("weight")
    const watchBuild = watch("build") as buildTypes
    const watchCustomText = watch("customText")


    // calc the t-shirt dimensions based on the user inputs
    const tShirtStyles = useMemo(() => {

        const defaultHeight = 220
        const defaultWeight = 180

        // build options scale based on buildTypes
        const buildScale = {
            lean: {
                width: 0.9,
                height: 1.1
            },
            regular: {
                width: 1,
                height: 1
            },
            athletic: {
                width: 1.1,
                height: 1
            },
            big: {
                width: 1.2,
                height: 0.8
            }
        }

        // do incrementation orr decrementation approx 20% of (+ve & -ve) on the basis of the user Input values for the height and weight 
        const heightScale = 1 + ((watchHeight - 170) / 170) * 0.4
        const weightScale = 1 + ((watchWidth - 80) / 50) * 0.4

        const finalHeight = defaultHeight * buildScale[watchBuild].height * heightScale
        const finalWeight = defaultWeight * buildScale[watchBuild].width * weightScale


        return {
            height: Math.max(Math.min(finalHeight, defaultHeight * 1.5), defaultHeight * 0.5),
            weight: Math.max(Math.min(finalWeight, defaultWeight * 1.5), defaultWeight * 0.5)
        }

    }, [watchHeight, watchWidth, watchBuild])


    // Default Image 
    const defaultImage = DefaultImage
    const imageUrl = isUploadImage || defaultImage
    const onSubmit = (data: customizationFormData) => {
        if (!data.height || !data.weight || !data.build || (!data.imageUrl && !isUploadImage) || !data.customText) {
            toast.error("Please fill out all fields before submitting the form.");
            return;
        }
        console.log(data);
        toast.success("T-shirt customization form submitted successfully, Please check the console for the submitted data.");
    }


    const getInputClasses = () => {
        return `w-full p-3 rounded-md transition-colors duration-300 ${theme === 'dark'
            ? 'bg-slate-700 text-white border-slate-600 focus:border-amber-500'
            : 'bg-white border-gray-300 focus:border-blue-500'
            } ${styles.border} border focus:outline-none focus:ring-1 ${theme === 'purple' ? 'focus:ring-purple-500' : theme === 'dark' ? 'focus:ring-amber-500' : 'focus:ring-blue-500'
            }`;
    };

    const getTextareaClasses = () => {
        return `w-full p-3 rounded-md transition-colors duration-300 ${theme === 'dark'
            ? 'bg-slate-700 text-white border-slate-600 focus:border-amber-500'
            : 'bg-white border-gray-300 focus:border-blue-500'
            } ${styles.border} border focus:outline-none focus:ring-1 ${theme === 'purple' ? 'focus:ring-purple-500' : theme === 'dark' ? 'focus:ring-amber-500' : 'focus:ring-blue-500'
            }`;
    };

    const getLabelClasses = () => {
        return `block mb-2 font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`;
    };



    return (

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
            <div className="grid md:grid-cols-2 gap-8">

                <div className="flex flex-col items-center">
                    <h2 className={`text-xl font-bold mb-4 self-start ${styles.heading}`}>Preview</h2>

                    <div className={`relative ${theme === 'dark' ? 'bg-slate-700' : 'bg-gray-100'} rounded-lg p-4 w-full h-96 flex items-center justify-center transition-colors duration-500`}>
                        <div className="relative w-full h-full flex items-center justify-center">

                            <div
                                className="absolute inset-0 flex items-center justify-center transition-all duration-300"
                                style={{
                                    transform: `scale(${tShirtStyles.weight / 200}, ${tShirtStyles.height / 250})`
                                }}
                            >
                                <Shirt
                                    className="w-11/12 h-11/12"
                                    color={theme === 'light' ? '#94a3b8' : theme === 'purple' ? '#a855f7' : '#f59e0b'}
                                    fill={theme === 'light' ? 'white' : theme === 'purple' ? '#f8fafc' : '#f8fafc'}
                                    strokeWidth="1"
                                />
                            </div>

                            {imageUrl && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-2/5 h-2/5 overflow-hidden mt-8">
                                        <img
                                            src={imageUrl}
                                            alt="Custom design"
                                            className="w-full h-full object-contain rounded-full"
                                        />
                                    </div>
                                </div>
                            )}

                            {watchCustomText && (
                                <div className="absolute inset-0 flex items-center justify-center mt-32">
                                    <div className="w-4/5 text-center">
                                        {watchCustomText.split('\n').map((line, i) => (
                                            i < 3 && line ? <p key={i} className="font-bold text-sm">{line}</p> : null
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-6 w-full">
                        <h3 className={`text-lg font-semibold mb-3 ${styles.heading}`}>Your Message</h3>
                        <Textarea
                            {...register('customText')}
                            placeholder="Enter text to print on your shirt (max 3 lines)"
                            maxLength={50}
                            rows={30}
                            cols={20}
                            className={getTextareaClasses()}
                        />
                        <p className={`mt-1 text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            Max 3 lines of text. Press Enter for new line.
                        </p>
                    </div>
                </div>


                <div>
                    <h2 className={`text-xl font-bold mb-4 ${styles.heading}`}>Customize Your Fit</h2>

                    <div className={`p-4 rounded-md ${theme === 'dark' ? 'bg-slate-700' : 'bg-gray-100'} mb-6 transition-colors duration-500`}>
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="height" className={getLabelClasses()}>Height (cm)</Label>
                                <Input
                                    type="number"
                                    id="height"
                                    {...register('height', { min: 120, max: 220 })}
                                    className={getInputClasses()}
                                    min={120}
                                    max={220}
                                />
                                {errors.height && (
                                    <p className="mt-1 text-red-500 text-xs">Height must be between 120-220 cm</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="weight" className={getLabelClasses()}>Weight (kg)</Label>
                                <Input
                                    type="number"
                                    id="weight"
                                    {...register('weight', { min: 30, max: 200 })}
                                    className={getInputClasses()}
                                    min={30}
                                    max={200}
                                />
                                {errors.weight && (
                                    <p className="mt-1 text-red-500 text-xs">Weight must be between 30-200 kg</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="build" className={getLabelClasses()}>Build</Label>
                                <Controller
                                    control={control}
                                    name="build"
                                    render={({ field }) => (
                                        <div className="flex gap-2 flex-wrap justify-center items-center w-full">
                                            {buildOptions.map((option) => (
                                                <Button
                                                    type="button"
                                                    key={option}
                                                    onClick={() => field.onChange(option)}
                                                    className={`py-2 px-3 sm:w-1/5 rounded-md border transition-all cursor-pointer ${field.value === option
                                                        ? theme === 'purple'
                                                            ? 'bg-purple-500 text-white border-purple-500 hover:bg-purple-600'
                                                            : theme === 'dark'
                                                                ? 'bg-amber-500 text-slate-900 border-amber-500 hover:bg-amber-600'
                                                                : 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600'
                                                        : theme === 'dark'
                                                            ? 'bg-slate-800 text-gray-300 border-slate-700 hover:bg-slate-700'
                                                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-200'
                                                        }`}
                                                >
                                                    {option.charAt(0).toUpperCase() + option.slice(1)}
                                                </Button>
                                            ))}
                                        </div>
                                    )}
                                />
                            </div>
                        </div>
                    </div>

                    <h2 className={`text-xl font-bold mb-4 ${styles.heading}`}>Upload Design</h2>
                    <ImageUploader
                        onImageUploader={setIsUploadImage}
                        theme={theme}
                        styles={styles}
                    />

                    <Button
                        type="submit"
                        className={`mt-8 w-full py-3 px-6 rounded-md flex items-center justify-center gap-2 ${styles.button} transition-all duration-300 text-lg font-medium cursor-pointer`}
                    >
                        Add to Cart
                        <ArrowRight size={18} />
                    </Button>
                </div>
            </div>
        </form>
    )
}